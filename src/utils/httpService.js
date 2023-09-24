import axios from "axios";

// GET Request
export const getService = async (url) => {
  try {
    const response = await axios.get(url);
    return [response?.data, null];
  } catch ({ response }) {
    return [null, response?.data];
  }
};

// POST Request
export const postService = async (url, params) => {
  try {
    const response = await axios.post(url, params);
    return [response?.data, null];
  } catch ({ response }) {
    return [null, response?.data];
  }
};

// PUT Request
export const putService = async (url, params) => {
  try {
    const response = await axios.put(url, params);
    return [response?.data, null];
  } catch ({ response }) {
    return [null, response?.data];
  }
};

// DELETE Request
export const deleteService = async (url) => {
  try {
    const response = await axios.delete(url);
    return [response?.data, null];
  } catch ({ response }) {
    return [null, response?.data];
  }
};
