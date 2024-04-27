import axios from "axios";
import { getLocalStore } from "@/utils/commonFn";

/**
 * Function to generate headers for HTTP requests with bearer token authorization.
 * @returns {object} - The headers object with Authorization header if token exists.
 */

const getHeader = () => {
  const token = getLocalStore("access_token");
  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

/**
 * Function to redirect the user to the login page if unauthorized.
 */

const redirectToLogin = () => {
  if (["/sign-in", "/register"].indexOf(window.location.pathname) === -1) {
    window.location.href = `${window.location.origin}/sign-in`;
  }
};

/**
 * Function to handle GET requests.
 * @param {string} url - The URL to send the GET request to.
 * @param {object} customerHeader - Custom headers to be included in the request.
 * @returns {array} - An array containing response data and error data.
 */

export const getService = async (url, customerHeader) => {
  try {
    const response = await axios.get(url, customerHeader || getHeader());
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.data?.code === 401) {
      redirectToLogin();
    }
    return [null, response?.data];
  }
};


/**
 * Function to handle POST requests.
 * @param {string} url - The URL to send the POST request to.
 * @param {object} params - The data to be sent in the request body.
 * @returns {array} - An array containing response data and error data.
 */

export const postService = async (url, params) => {
  try {
    const response = await axios.post(url, params, getHeader());
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.data?.code === 401) {
      redirectToLogin();
    }
    return [null, response?.data];
  }
};

/**
 * Function to handle PUT requests.
 * @param {string} url - The URL to send the PUT request to.
 * @param {object} params - The data to be sent in the request body.
 * @returns {array} - An array containing response data and error data.
 */

export const putService = async (url, params) => {
  try {
    const response = await axios.put(url, params);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.data?.code === 401) {
      redirectToLogin();
    }
    return [null, response?.data];
  }
};

/**
 * Function to handle DELETE requests.
 * @param {string} url - The URL to send the DELETE request to.
 * @returns {array} - An array containing response data and error data.
 */

export const deleteService = async (url) => {
  try {
    const response = await axios.delete(url);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.data?.code === 401) {
      redirectToLogin();
    }
    return [null, response?.data];
  }
};
