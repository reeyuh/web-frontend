"use client";

import { useState, useEffect, useContext } from "react";
import { Sign, CommonContext } from "@/components";
import { REGISTER_FORM_INPUTS } from "@/data/SignData";
import { baseApiServer } from "@/utils/enviroment";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { setAccessToken, redirectToSsoUrl } from "@/utils/commonFn";
import { useSearchParams, useRouter } from "next/navigation";

export default function Register() {
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
  });
  const [ssoUrl, setSSOUrl] = useState();
  const { setSnackBarMessage } = useContext(CommonContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const getSSOCode = searchParams.get("code");

  const customSignup = async (data) => {
    if (data.password !== data.confirm_password) {
      setActionHandler((val) => ({
        ...val,
        error: "Password and confirm password are not matched",
      }));
      return;
    }
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      error: "",
      success: "",
      disabled: { ...val.disabled, google: true },
    }));
    onRegister(`${baseApiServer}${apiList.signup}`, data, true);
  };

  const setDisabledSso = (isDisabled) => {
    setActionHandler((val) => ({
      ...val,
      disabled: { ...val.disabled, google: isDisabled },
    }));
  };

  const fetchSSOUrl = async () => {
    const response = await getService(`${baseApiServer}${apiList.ssoUrl}`);
    if (response[0]?.data) {
      setSSOUrl(response[0].data);
    } else {
      setActionHandler((val) => ({
        ...val,
        disabled: { ...val.disabled, google: true },
      }));
    }
  };

  const onRegister = async (url, data, isCustomSignup) => {
    const response = await postService(url, data);
    setActionHandler((val) => ({
      ...val,
      isLoading: false,
    }));
    if (response[0]?.data?.access_token) {
      setAccessToken({
        ...response[0]?.data,
        display_name: isCustomSignup
          ? `${data.first_name} ${data.last_name}`
          : null,
      });
      const message = "Registered successfully, redirecting to dashboard...";
      !isCustomSignup &&
        setSnackBarMessage({
          message,
          time: 3000,
          severity: "success",
        });
      isCustomSignup &&
        setActionHandler((val) => ({
          ...val,
          success: message,
          hidden: { btnSection: true },
        }));
      setTimeout(() => {
        router.replace("/dashboard");
      }, 3000);
    } else {
      setDisabledSso(false);
      if (isCustomSignup) {
        setActionHandler((val) => ({ ...val, error: response[1]?.message }));
      } else {
        fetchSSOUrl();
        router.replace("/");
        setSnackBarMessage({
          message: response[1]?.message,
          time: 3000,
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (getSSOCode) {
      setDisabledSso(true);
      onRegister(`${baseApiServer}${apiList.ssoSignup}`, {
        authorization_code: getSSOCode,
      });
    } else {
      fetchSSOUrl();
    }
  }, [getSSOCode]);
  return (
    <Sign
      formInputs={REGISTER_FORM_INPUTS}
      sendForm={customSignup}
      googleSSO={() =>
        ssoUrl && !actionHandler.disabled?.google
          ? redirectToSsoUrl(ssoUrl)
          : null
      }
      actionHandler={actionHandler}
    />
  );
}
