const getInitials = (name) => {
  if (name) {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return initials;
  }
  return null;
};

const setAccessToken = (data) => {
  localStorage.setItem("access_token", data?.access_token);
  data?.display_name &&
    localStorage.setItem("display_name", data?.display_name);

  data?.email && localStorage.setItem("email", data?.email);
};

const redirectToSsoUrl = (ssoUrl) => {
  window.location.replace(ssoUrl);
};

const getLocalStore = (value) => {
  if (typeof window !== "undefined" && value) {
    return window.localStorage.getItem(value);
  }
  return null;
};

export { getInitials, setAccessToken, redirectToSsoUrl, getLocalStore };
