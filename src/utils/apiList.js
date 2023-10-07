import { userApiServer, agentApiServer } from "./enviroment";

export const apiList = {
  ssoUrl: `${userApiServer}get_sso_url`,
  ssoSignup: `${userApiServer}ssosignup`,
  ssoLogin: `${userApiServer}ssologin`,
  signup: `${userApiServer}signup`,
  login: `${userApiServer}login`,
  sendOtp: `${userApiServer}send_otp`,
  resetPassword: `${userApiServer}forgot_password`,
  getProfile: `${userApiServer}get-profile`,
  validateToken: `${userApiServer}validate_token`,
  mfaLogin: `${userApiServer}mfa_login`,
  verifyOtp: `${userApiServer}verify_otp`,
  changePassword: `${userApiServer}change_password`,
  verifyEmail: `${userApiServer}validate_email`,
  getQRlink: `${userApiServer}generate_mfa_uri`,
  enableMfa: `${userApiServer}enable_mfa`,
  verifyMfaOtp: `${userApiServer}verify_mfa_otp`,
  agentStatus: `${agentApiServer}agent_status_list`,
  securityData: "http://openlibrary.org/search.json?q=the+lord+of+the+rings",
  userData: "http://openlibrary.org/search.json?q=the+lord+of+the+rings",
};
