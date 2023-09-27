"use client";

import {
  VALIDATION,
  FIRST_NAME,
  LAST_NAME,
  COMPANY,
  EMAIL,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
} from "./CommonData";

export const FORM_INPUTS = {
  email: EMAIL,
  password: {
    label: "Password",
    name: "password",
    placeholder: "Password",
    formControlClass: "mt-4 pt-0",
    fieldClass: "w-100",
    type: "password",
    isRequired: true,
    pattern: VALIDATION.PASSWORD,
    maxLength: 50,
    minLength: 8,
    errors: [
      { type: "required", message: "Please enter your password" },
      {
        type: "minLength",
        message:
          "Password must be more than 7 characters including uppercase, lowercase, numbers and special characters",
      },
      {
        type: "pattern",
        message:
          "Password must be more than 7 characters including uppercase, lowercase, numbers and special characters",
      },
    ],
  },
};

const { email, password } = FORM_INPUTS;

// Login
export const LOGIN_FORM_INPUTS = {
  className: "sign-container",
  brand: {
    className: "sign-logo",
  },
  header: {
    heading: {
      title: "Login",
      className: "sign-heading my-1",
    },
    subheading: {
      title: "Please login to your account",
      className: "sign-subheading",
    },
    googleSSO: {
      title: "Sign in with Google",
      className: "gap-2",
    },
  },
  footer: {
    link: {
      className: "",
      title: "Forgot your password?",
      url: "/forgot-password",
    },
    buttonText: {
      className: "",
      title: "Login",
    },
  },
  data: [email, password],
};

// register
export const REGISTER_FORM_INPUTS = {
  className: "sign-container",
  brand: {
    className: "sign-logo",
  },
  header: {
    heading: {
      title: "Register",
      className: "sign-heading my-1",
    },
    subheading: {
      title: "Welcome to TrueNil",
      className: "sign-subheading",
    },
    googleSSO: {
      title: "Sign up with Google",
      className: "gap-2",
    },
  },
  footer: {
    link: {
      className: "",
      title: "Already a member? Sign In",
      url: "/sign-in",
    },
    buttonText: {
      className: "",
      title: "Register",
    },
  },
  data: [
    {
      ...FIRST_NAME,
      md: 6,
      lg: 6,
      xl: 6,
    },
    {
      ...LAST_NAME,
      md: 6,
      lg: 6,
      xl: 6,
    },
    email,
    password,
    {
      ...password,
      name: "confirm_password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      errors: [
        { type: "required", message: "Please enter your confirm password" },
        {
          type: "minLength",
          message:
            "Confirm password must be more than 7 characters including uppercase, lowercase, numbers and special characters",
        },
        {
          type: "pattern",
          message:
            "Confirm password must be more than 7 characters including uppercase, lowercase, numbers and special characters",
        },
      ],
    },
    COMPANY,
  ],
};

// forgot password
export const FORGOT_FORM_INPUTS = {
  className: "sign-container",
  brand: {
    className: "sign-logo",
  },
  header: {
    heading: {
      title: "Forgot Password",
      className: "sign-heading my-1",
    },
    subheading: {
      title:
        "Enter your email and hit submit, we will send you a OTP to reset your password.",
      className: "sign-subheading",
    },
  },
  footer: {
    buttonText: {
      className: "",
      title: "Submit",
    },
  },
  data: [email],
};

export const RESET_PASSWORD_FORM_INPUTS = {
  otp: {
    label: "OTP",
    name: "otp",
    placeholder: "OTP",
    formControlClass: "mt-4 pt-0",
    fieldClass: "w-100",
    type: "text",
    isRequired: true,
    pattern: VALIDATION.OTP,
    maxLength: 6,
    minLength: 6,
    errors: [
      { type: "required", message: "Please enter OTP" },
      {
        type: "minLength",
        message: "OTP must be 6 digit",
      },
      {
        type: "pattern",
        message: "OTP must be 6 digit",
      },
    ],
  },
};

export const RESET_PASSWORD_FORM = {
  className: "sign-container",
  header: {
    heading: {
      title: "Reset Password",
      className: "sign-heading my-1",
    },
    subheading: {
      title: "Enter your new password below",
      className: "sign-subheading",
    },
  },
  footer: {
    buttonText: {
      className: "",
      title: "Verify",
    },
    link: {
      className: "",
      title: "Step 1 of 2",
    },
  },
  data: [email, RESET_PASSWORD_FORM_INPUTS.otp, NEW_PASSWORD, CONFIRM_PASSWORD],
};

export const MFA_FORM_INPUTS = {
  className: "sign-container",
  header: {
    heading: {
      title: "Multi-Factor Authentication",
      className: "sign-heading my-1",
    },
    subheading: {
      title: "Enter one time password",
      className: "sign-subheading",
    },
  },
  footer: {
    buttonText: {
      className: "",
      title: "Next",
    },
  },
  data: [RESET_PASSWORD_FORM_INPUTS.otp],
};
