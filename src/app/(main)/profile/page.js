"use client";

import { useState, useEffect, useContext } from "react";
import { Form, CommonContext } from "@/components";
import { PROFILE_INPUTS, CHANGE_PASSWORD_INPUTS } from "@/data/ProfileData";
import { baseApiServer } from "@/utils/enviroment";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";

export default function Profile() {
  const [formValues, setFormValues] = useState({});
  const [profileActionHandler, setProfileActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
    readonly: { organization: true, email: true },
    key: "profile",
  });

  const [passwordActionHandler, setPasswordActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
    readonly: { organization: true, email: true },
    key: "password",
  });

  const { setSnackBarMessage } = useContext(CommonContext);
  const fetchProfile = async () => {
    const response = await getService(`${baseApiServer}${apiList.getProfile}`);
    const result = response[0]?.data;
    if (result) {
      setProfileActionHandler((val) => ({ ...val, key: val.key + 1 }));
      setFormValues(result);
    } else {
      setSnackBarMessage({
        message: response[1]?.message,
        time: 3000,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChangePassword = async (data) => {
    setPasswordActionHandler((val) => ({
      ...val,
      error: "",
      success: "",
    }));

    if (data.new_password !== data.confirm_password) {
      setPasswordActionHandler((val) => ({
        ...val,
        error: "New password and confirm password are not matched",
      }));
      return;
    }
    delete data.confirm_password;

    setPasswordActionHandler((val) => ({
      ...val,
      isLoading: true,
    }));

    const response = await postService(
      `${baseApiServer}${apiList.changePassword}`,
      data
    );

    if (response[0]) {
      setPasswordActionHandler((val) => ({
        ...val,
        success: "Password has been updated successfully",
        hidden: { ...val.hidden, btnSection: true },
        isLoading: false,
        key: val.key + 1,
      }));
      setTimeout(() => {
        setPasswordActionHandler((val) => ({
          ...val,
          success: "",
          hidden: {},
        }));
      }, 3000);
    } else {
      setPasswordActionHandler((val) => ({
        ...val,
        isLoading: false,
        error: response[1].message,
      }));
    }
  };

  return (
    <>
      <Form
        key={profileActionHandler.key}
        list={PROFILE_INPUTS}
        values={formValues}
        actionHandler={profileActionHandler}
      />
      <Form
        key={passwordActionHandler.key}
        list={CHANGE_PASSWORD_INPUTS}
        formSubmit={onChangePassword}
        actionHandler={passwordActionHandler}
      />
    </>
  );
}
