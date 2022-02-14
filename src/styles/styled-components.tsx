import styled from 'styled-components/native';
import * as COLORS from './colors';

import { TextInput, Button} from 'react-native-paper';


const CustomInput = styled(TextInput)({
  paddingHorizontal: 0,
  marginVertical: 5,
  backgroundColor: 'transparent'
});

const CustomButton = styled(Button)({
    marginVertical: 5,
  });

export {CustomInput, CustomButton};
