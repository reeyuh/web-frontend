"use client";

import { useState, useEffect, useContext } from "react";
import { Form, CommonContext } from "@/components";
import { PROFILE_INPUTS, CHANGE_PASSWORD_INPUTS } from "@/data/profileData";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { MfaOptions } from "./mfaOptions";
import CircularProgress from "@mui/material/CircularProgress";

export default function Profile() {
  const [formValues, setFormValues] = useState({});
  const [isMfaLoading, setIsMfaLoading] = useState(false);
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
    readonly: {},
    key: "password",
  });

  const { setSnackBarMessage } = useContext(CommonContext);
  const fetchProfile = async () => {
    const response = await getService(apiList.getProfile);
    const result = response[0]?.data;
    setIsMfaLoading(false);
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

  const onUpdateProfile = async (data) => {
    setProfileActionHandler((val) => ({
      ...val,
      error: "",
      success: "",
      isLoading: true,
    }));

    const response = await postService(apiList.updateProfile, {
      first_name: data.first_name,
      last_name: data.last_name,
    });
    if (response[0]) {
      setProfileActionHandler((val) => ({
        ...val,
        success: "Profile has been updated successfully",
        hidden: { ...val.hidden, btnSection: true },
        isLoading: false,
      }));
      setTimeout(() => {
        setProfileActionHandler((val) => ({
          ...val,
          success: "",
          hidden: {},
        }));
      }, 3000);
    } else {
      setProfileActionHandler((val) => ({
        ...val,
        isLoading: false,
        error: response[1].message,
      }));
    }
  };

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

    const response = await postService(apiList.changePassword, data);

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
      {!formValues.email ? (
        <div className="d-flex align-items-center justify-content-center pt-5">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Form
            key={profileActionHandler.key}
            list={PROFILE_INPUTS}
            values={formValues}
            formSubmit={onUpdateProfile}
            actionHandler={profileActionHandler}
          />
          {formValues.set_password && (
            <>
              <Form
                key={passwordActionHandler.key}
                list={CHANGE_PASSWORD_INPUTS}
                formSubmit={onChangePassword}
                actionHandler={passwordActionHandler}
              />
              {isMfaLoading ? (
                <div className="d-flex align-items-center justify-content-center pt-5">
                  <CircularProgress />
                </div>
              ) : (
                <MfaOptions
                  values={formValues}
                  key={profileActionHandler.key}
                  fetchProfile={() => {
                    setIsMfaLoading(true);
                    fetchProfile();
                  }}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
