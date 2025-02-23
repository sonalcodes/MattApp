import {RouteProp} from '@react-navigation/native';

/**
 * THIS IS TO DEFINE PARAMS THAT WILL BE PASSED TO THE
 * SCREEN - TO AVOID UN-NECESSARY ERROR WHICH ARE NOT ERROR BUT TYPES NOT DEFINED
 * AND GIVES CONFIDENCE ON THE PARAMS WE'RE RECEIVING
 * ALSO PROPER TYPE OF THE PARAMS
 *
 *
 * The reason behind `undefined` - `navigation.navigate('Route', {params})` method requires
 * whatever params we pass here so to avoid it requiring params always `undefined` is needed
 */
export type RootStackParamList = {
  Login: undefined; // No additional parameters
  PassCode: undefined; // No additonal parameters
  ForgotPassword: undefined; // No additional parameters
  Home: undefined; // No additional parameters
  Verification: {email: string}; // Verification route with 'email' parameter
  ChangePassword: {email: string}; // No additional parameters
  Drawer: undefined;
  Chat: {item: {id: number; name: string}};
  ACE:undefined;
  'GAD-7':undefined;
  QIDS:undefined;
  'PHQ-9':undefined;
  'RRS-10':undefined;
  NSESSS:undefined;
  'Y-BOCS':undefined;
  'C-SSRS':undefined;
  PrivacyPolicy:undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
