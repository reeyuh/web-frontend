"use client";

import { VALIDATION } from "./CommonData";

export const FORM_INPUTS = {
  email: {
    label: "Email",
    name: "email",
    placeholder: "Email Address",
    formControlClass: "my-4",
    fieldClass: "w-100",
    type: "text",
    isRequired: true,
    pattern: VALIDATION.EMAIL,
    maxLength: 100,
    minLength: 1,
    errors: [
      { type: "required", message: "Please enter your email" },
      { type: "pattern", message: "Please enter valid email" },
    ],
  },
  password: {
    label: "Password",
    name: "password",
    placeholder: "Password",
    formControlClass: "my-4",
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
      label: "First Name",
      name: "firstName",
      placeholder: "First Name",
      formControlClass: "my-4",
      fieldClass: "w-100",
      type: "text",
      isRequired: true,
      maxLength: 50,
      minLength: 1,
      pattern: VALIDATION.ALPHABET_ONLY,
      errors: [
        { type: "required", message: "Please enter your first name" },
        { type: "pattern", message: "Please enter only alphabets" },
      ],
    },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Last Name",
      formControlClass: "my-4",
      fieldClass: "w-100",
      type: "text",
      isRequired: true,
      maxLength: 50,
      minLength: 1,
      pattern: VALIDATION.ALPHABET_ONLY,
      errors: [
        { type: "required", message: "Please enter your last name" },
        { type: "pattern", message: "Please enter only alphabets" },
      ],
    },
    email,
    password,
    {
      ...password,
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
    {
      label: "Company Name",
      name: "company",
      placeholder: "Company Name",
      formControlClass: "my-4",
      fieldClass: "w-100",
      type: "text",
      isRequired: true,
      maxLength: 100,
      minLength: 1,
      pattern: VALIDATION.ALPHABET_NUMBER,
      errors: [
        { type: "required", message: "Please enter your company name" },
        { type: "pattern", message: "Please enter valid company name" },
      ],
    },
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
        "Enter your email and hit submit, we will send you a link to reset your password.",
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
  newPassword: {
    label: "New Password",
    name: "newPassword",
    placeholder: "New Password",
    formControlClass: "my-4",
    fieldClass: "w-100",
    type: "password",
    isRequired: true,
    pattern: VALIDATION.PASSWORD,
    maxLength: 50,
    minLength: 8,
    errors: [
      { type: "required", message: "Please enter your new password" },
      {
        type: "minLength",
        message:
          "Password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
      },
      {
        type: "pattern",
        message:
          "Password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
      },
    ],
  },
  confirmNewPassword: {
    label: "Confirm New Password",
    name: "confirmNewPassword",
    placeholder: "Confirm New Password",
    formControlClass: "my-4",
    fieldClass: "w-100",
    type: "password",
    isRequired: true,
    pattern: VALIDATION.PASSWORD,
    maxLength: 50,
    minLength: 8,
    errors: [
      { type: "required", message: "Please enter your confirm new password" },
      {
        type: "minLength",
        message:
          "Confirm new password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
      },
      {
        type: "pattern",
        message:
          "Confirm new password must be more than 7 characters including uppercase, lowercase, numbers, and special characters",
      },
    ],
  },
};

export const RESET_PASSWORD_FORM = {
  className: "sign-container",
  header: {
    heading: {
      title: "Reset Password",
      className: "reset-password-heading my-1",
    },
    subheading: {
      title: "Enter your new password below",
      className: "reset-password-subheading",
    },
  },
  footer: {
    buttonText: {
      className: "",
      title: "Submit",
    },
  },
  data: [RESET_PASSWORD_FORM_INPUTS.newPassword, RESET_PASSWORD_FORM_INPUTS.confirmNewPassword],
};
