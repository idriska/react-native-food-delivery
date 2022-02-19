export type FoodDeliveryTabParams = {
  [key: string]: any;
};

export type ProfileStackParam = {
  [key: string]: any;
};
export interface ISeperatedItems {
  key?: string;
  value?: string;
  navigator?: string;
}
export interface IAddress {
  title?: string;
  country?: string;
  province?: string;
  district?: string;
  full_address?: string;
  phone?: string;
}
export interface IPaymentMethods{
  title: string;
}
export interface IPaymentAction {
  value: string;
  data: {addressIndex: number; paymentMethod: string};
}