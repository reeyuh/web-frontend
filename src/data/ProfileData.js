import {
  VALIDATION,
  FIRST_NAME,
  LAST_NAME,
  COMPANY,
  EMAIL,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
} from "./CommonData";

export const PROFILE_INPUTS = [
  {
    name: "Profile Data",
    fields: [FIRST_NAME, LAST_NAME, COMPANY, EMAIL],
    btnList: [{ text: "Update Profile" }],
  },
];

export const CHANGE_PASSWORD_INPUTS = [
  {
    name: "Change Password",
    fields: [
      {
        label: "Current Password",
        name: "CurrentPassword",
        placeholder: "Current Password",
        type: "password",
        isRequired: true,
        pattern: VALIDATION.PASSWORD,
        maxLength: 50,
        minLength: 8,
        errors: [
          {
            type: "required",
            message: "Please enter your current password",
          },
          {
            type: "minLength",
            message:
              "Current password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
          },
          {
            type: "pattern",
            message:
              "Current password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
          },
        ],
      },
      NEW_PASSWORD,
      CONFIRM_PASSWORD,
    ],
    btnList: [{ text: "Update Password" }],
  },
];
