import {
  userApiServer,
  agentApiServer,
  dashboardApiServer,
} from "./enviroment";

export const apiList = {
  ssoUrl: `${userApiServer}get_sso_url`,
  ssoSignup: `${userApiServer}ssosignup`,
  ssoLogin: `${userApiServer}ssologin`,
  signup: `${userApiServer}signup`,
  login: `${userApiServer}login`,
  sendOtp: `${userApiServer}send_otp`,
  resetPassword: `${userApiServer}forgot_password`,
  getProfile: `${userApiServer}get-profile`,
  updateProfile: `${userApiServer}update_user_profile`,
  validateToken: `${userApiServer}validate_token`,
  mfaLogin: `${userApiServer}mfa_login`,
  verifyOtp: `${userApiServer}verify_otp`,
  changePassword: `${userApiServer}change_password`,
  verifyEmail: `${userApiServer}validate_email`,
  getQRlink: `${userApiServer}generate_mfa_uri`,
  enableMfa: `${userApiServer}enable_mfa`,
  verifyMfaOtp: `${userApiServer}verify_mfa_otp`,
  agentStatus: `${agentApiServer}agent_status_list`,
  securityDashboard: `${agentApiServer}file_list`,
  accessUserList: `${agentApiServer}file_user_list`,
  userList: `${userApiServer}get_user_management`,
  editUser: `${userApiServer}edit_user`,
  orgList: `${userApiServer}get_all_org`,
  createOrg: `${userApiServer}add_org`,
  policyMgmtData: `${agentApiServer}agent_status_list`,
  auditData: `${agentApiServer}agent_status_list`,
  dashboardAgentStatus: `${dashboardApiServer}agent_status_count`,
  dashboardFileType: `${dashboardApiServer}file_type_count`,
  dashboardUserManagement: `${dashboardApiServer}user_management`,
  dashboardControlAccess: `${dashboardApiServer}get_control_access`,
  auditLogs: `${agentApiServer}audit_logs_list`,
};
