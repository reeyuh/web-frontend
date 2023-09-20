/*eslint-disable */
export const VALIDATION = {
  PASSWORD:
    /^(?=.*[A-Z])(?=.*[<>{}\"/|;:.,~!?@#$%^=&*\]\\\()\[_+])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
  MOBILE: /^\d{10}$/,
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER_ONLY: /^[0-9]+$/,
  FLOAT_NUMBER: /^[0-9.]+$/,
  ALPHABET_ONLY: /^[A-Za-z]+$/,
  CUSTOM_CLIENT_EMAIL: /^(?!.*@(gmail\.com|yahoo\.com)).+@.+/,
  ALPHABET_NUMBER: /^[0-9a-zA-Z]+$/,
  NUMBER_SPECIAL: /^[0-9-+()<>{}\"/|;:.,~!?@#$%^=&*\\\[\]_]*$/,
  NUMBER_PLUE: /^[0-9-+]*$/,
  WEBSITE:
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  IMAGE: /(http[s]?:\/\/.*\.(?:png|jpg|jpeg))/i,
  OTP: /^[0-9]{6}$/,
};

export const MAX_FILE_UPLOAD_SIZE = 5242880;

export const FIRST_NAME = {
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
};

export const LAST_NAME = {
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
};

export const COMPANY = {
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
};

export const EMAIL = {
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
};

export const NEW_PASSWORD = {
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
};

export const CONFIRM_PASSWORD = {
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
};
