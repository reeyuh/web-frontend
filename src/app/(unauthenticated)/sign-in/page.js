"use client";

import { useState, useEffect, useContext } from "react";
import { Sign, CommonContext } from "@/components";
import { LOGIN_FORM_INPUTS } from "@/data/SignData";
import { baseApiServer } from "@/utils/enviroment";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { setAccessToken, redirectToSsoUrl } from "@/utils/commonFn";
import { useSearchParams, useRouter } from "next/navigation";

export default function SignIn() {
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

  const customSignin = async (data) => {
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      error: "",
      success: "",
      disabled: { ...val.disabled, google: true },
    }));
    onLogin(`${baseApiServer}${apiList.login}`, data, true);
  };

  const setDisabledSso = (isDisabled) => {
    setActionHandler((val) => ({
      ...val,
      disabled: { ...val.disabled, google: isDisabled },
    }));
  };

  const fetchSSOUrl = async () => {
    const response = await getService(`${baseApiServer}${apiList.ssoUrl}`);
    const result = response[0]?.data;
    if (result) {
      //.replace("sso", "sign-in")
      setSSOUrl(result);
    } else {
      setActionHandler((val) => ({
        ...val,
        disabled: { ...val.disabled, google: true },
      }));
    }
  };

  const onLogin = async (url, data, isCustomSignIn) => {
    console.log(url, "data");
    const response = await postService(url, data);
    setActionHandler((val) => ({
      ...val,
      isLoading: false,
    }));
    if (response[0]?.data?.access_token) {
      setAccessToken(response[0]?.data);

      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      setDisabledSso(false);
      if (isCustomSignIn) {
        setActionHandler((val) => ({ ...val, error: response[1]?.message }));
      } else {
        fetchSSOUrl();
        router.replace("/sign-in");
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
      onLogin(`${baseApiServer}${apiList.ssoLogin}`, {
        authorization_code: getSSOCode,
      });
    } else {
      fetchSSOUrl();
    }
  }, [getSSOCode]);
  return (
    <Sign
      formInputs={LOGIN_FORM_INPUTS}
      sendForm={customSignin}
      googleSSO={() =>
        ssoUrl && !actionHandler.disabled?.google
          ? redirectToSsoUrl(ssoUrl)
          : null
      }
      actionHandler={actionHandler}
    />
  );
}
