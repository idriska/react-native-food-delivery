import React, {useEffect, useState} from 'react';
import styles from './style';
import {SafeAreaView, View} from 'react-native';
import Modal from 'react-native-modal';
import {getBufWithMeta, upload} from '../../services/ImageUpload';
import {AuthService} from '../../services/Auth';
import {showToastMessage} from './../../services/Helper';
import {useNavigation} from '@react-navigation/native';
import {
  ProfileStackParam,
  FoodDeliveryTabParams,
} from '../../interfaces/interfaces';
import {userStore} from '../../redux/store';
import {
  Authorization,
  ProfileItemsList,
  ProfilePicture,
  UploadImage,
} from '../../components';
import {updateUser} from '../../services/DataService';

const unseperatedItems = [
  {
    key: 'my_orders',
    value: 'My Orders',
    navigator: 'MyOrders',
  },
];

const Profile = () => {
  const appNavigation = useNavigation<FoodDeliveryTabParams>();
  const profileNavigation = useNavigation<ProfileStackParam>();

  const [seperatedItems, setSeperatedItems] = useState([
    {
      key: 'Email',
      value: '',
    },
    {
      key: 'Name',
      value: '',
    },
    {
      key: 'Surname',
      value: '',
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<any>(userStore.getState());

  const authService = new AuthService();

  useEffect(() => {
    let userData = userStore.getState();
    if (userData) {
      setUser(userData);
      prepareSeperateItems(userData);
    }

    const userSub = userStore.subscribe(() => {
      let userState: any = userStore.getState();
      setUser(userState);
    });
    return () => {
      userSub();
    };
  }, [user]);

  const prepareSeperateItems = (userData: any) => {
    seperatedItems.forEach(
      (item: any) =>
        (item.value = userData[item.key.toLowerCase()]
          ? userData[item.key.toLowerCase()]
          : ''),
    );
    setSeperatedItems([...seperatedItems]);
  };

  const login = async (loginData: any) => {
    await authService
      .spicaLogin(loginData.email, loginData.password)
      .then(() => {
        appNavigation.navigate('Home');
      })
      .catch(err => {
        showToastMessage(err.message);
      });
  };

  const register = async (registerData: any) => {
    await authService
      .spicaRegister(registerData)
      .then((res: any) => {
        showToastMessage(res['message']);
        login({
          email: registerData.email,
          password: registerData.password,
        });
      })
      .catch(error => {
        showToastMessage(error.response.data.message);
      });
  };

  const logout = () => {
    authService.logout();
  };

  const changeImage = async (image: any) => {
    const bufWithMeta = await getBufWithMeta(image);

    let newImage: any = '';
    let imageId;

    if (!user['profile_picture']) {
      newImage = await upload(bufWithMeta).catch(err => {
        console.log(err);
      });
    } else {
      let splitArr = user.profile_picture.split('/');
      imageId = splitArr[splitArr.length - 1].split('?')[0];

      newImage = await upload(bufWithMeta, imageId).catch(err => {
        console.log(err);
      });
    }

    if (newImage) {
      user['profile_picture'] =
        newImage.url + `&timestamp=${new Date().getTime()}`;
      updateUser(user);
    }
  };

  return (
    <SafeAreaView>
      {user ? (
        <View style={styles.profileContainer}>
          <ProfilePicture
            thumbnail={user.profile_picture}
            imagePicker={() => {
              setModalVisible(true);
            }}
          />
          <ProfileItemsList
            seperatedItems={seperatedItems}
            unseperatedItems={unseperatedItems}
            logout={() => logout()}
            navigateTo={(value: string) => {
              profileNavigation.navigate(value);
            }}
          />
        </View>
      ) : (
        <Authorization
          login={(data: any) => {
            login(data);
          }}
          register={(data: any) => {
            register(data);
          }}
        />
      )}

      <Modal
        isVisible={isModalVisible}
        style={{justifyContent: 'flex-end', margin: 0}}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}>
        <UploadImage
          completed={(data: any) => {
            if (data) {
              changeImage(data);
            }
            setModalVisible(false);
          }}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
