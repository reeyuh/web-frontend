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

const setInitialValues = (data) => {
  data?.access_token && localStorage.setItem("access_token", data.access_token);
  data?.display_name && localStorage.setItem("display_name", data.display_name);
  data?.email && localStorage.setItem("email", data.email);
  data?.role && localStorage.setItem("role", data.role);
  (data.email || data?.organization) &&
    localStorage.setItem(
      "organization",
      data.organization ||
        data.email.substring(
          data.email.indexOf("@") + 1,
          data.email.lastIndexOf(".")
        )
    );
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

const getPaginationProps = (
  totalCount,
  currentPage,
  itemsPerPage,
  handlePaginationChange
) => {
  return {
    numberOfPages: Math.ceil(totalCount / itemsPerPage),
    currentPage: totalCount > 0 ? currentPage : 0,
    count: totalCount,
    handleChange: handlePaginationChange,
    itemsPerPage: itemsPerPage,
  };
};

export {
  getInitials,
  setInitialValues,
  redirectToSsoUrl,
  getPaginationProps,
  getLocalStore,
};
