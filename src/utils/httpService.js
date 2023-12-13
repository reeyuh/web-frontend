import axios from "axios";
import { getLocalStore } from "@/utils/commonFn";

const getHeader = () => {
  const token = getLocalStore("access_token");

  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

const redirectToLogin = () => {
  if (["/sign-in", "/register"].indexOf(window.location.pathname) === -1) {
    window.location.href = `${window.location.origin}/sign-in`;
  }
};

// GET Request
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

// POST Request
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

// PUT Request
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

// DELETE Request
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
