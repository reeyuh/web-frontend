import axios from "axios";

axios.defaults.withCredentials = true;

const headers = { headers: {}, withCredentials: true };

const goToHome = (baseUrl) => {
  const login = window.location.origin + "/login";
  if (window.location.href !== login && baseUrl.indexOf("/is-auth") === -1) {
    window.location.href = window.location.origin + "/login";
  }
};

// GET Request
export const getService = async (baseUrl) => {
  try {
    const response = await axios.get(baseUrl, headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 401) {
      goToHome(baseUrl);
    }
    return [null, response && response.data];
  }
};

// POST Request
export const postService = async (baseUrl, params) => {
  try {
    const response = await axios.post(baseUrl, request(params), headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 401) {
      goToHome(baseUrl);
    }
    return [null, response && response.data];
  }
};

// POST Request
export const postFileService = async (baseUrl, params) => {
  try {
    const response = await axios.post(baseUrl, params, headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 401) {
      goToHome(baseUrl);
    }
    return [null, response && response.data && response?.data];
  }
};

// PUT Request
export const putService = async (baseUrl, params) => {
  try {
    const response = await axios.put(baseUrl, request(params), headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 401) {
      goToHome(baseUrl);
    }
    return [null, response && response.data && response?.data];
  }
};

// DELETE Request
export const deleteService = async (baseUrl) => {
  try {
    const response = await axios.delete(baseUrl, headers);
    return [response?.data, null];
  } catch ({ response }) {
    if (response?.status === 401) {
      goToHome(baseUrl);
    }
    return [null, response && response.data];
  }
};
