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
        name: "current_password",
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

export const MFA_FORM_INPUTS = {
  header: {
    heading: {
      title: "One Time Password Setup",
      className: "heading",
    },
    subheading: {
      title: "",
      className: "subheading",
    },
  },
  errors: {
    required: "Please enter six digit",
  },
  controls: [
    {
      controlType: "Radio",
      labelGroup: [
        {
          label: "Send a one time password to the registered email address",
          value: "email",
        },
        {
          label: "Setup a mobile authenticator for one time password",
          labelTwo: "Use the mobile authenticator to get a one time password",
          value: "totp",
        },
      ],
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      key: "otp_type",
      name: "otp_type",
      hide: false,
      boxSxProps: { py: 1 },
    },
  ],
};
