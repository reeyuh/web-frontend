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
