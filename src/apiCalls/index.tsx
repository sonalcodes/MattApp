import {forgotPasswordApiCall} from './apiMethods/forgotPassword';
import {formSubmissionApiCall} from './apiMethods/formSubmisstion';
import {getFormsApiCall} from './apiMethods/getForms';
import {getMessageApiCall} from './apiMethods/getMessages';
import {getNotificationCount} from './apiMethods/getNotificationCount';
import {loginApiCall} from './apiMethods/login';
import {otpVerifyApiCall} from './apiMethods/otpVerify';
import {resetPasswordApiCall} from './apiMethods/resetPassword';
import {sendMessageApiCall} from './apiMethods/sendMessage';
import {updateTimezoneApiCall} from './apiMethods/updateTimezone';
import {verifyUserApiCall} from './apiMethods/verifiedUserCheck';

const api = {
  loginApiCall,
  otpVerifyApiCall,
  resetPasswordApiCall,
  forgotPasswordApiCall,
  verifyUserApiCall,
  getMessageApiCall,
  sendMessageApiCall,
  updateTimezoneApiCall,
  formSubmissionApiCall,
  getFormsApiCall,
  getNotificationCount,
};

export default api;
