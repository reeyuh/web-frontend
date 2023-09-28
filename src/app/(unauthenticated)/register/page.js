"use client";

import { useState, useEffect, useContext } from "react";
import { Sign, CommonContext, Modal } from "@/components";
import { REGISTER_FORM_INPUTS } from "@/data/SignData";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { setAccessToken, redirectToSsoUrl } from "@/utils/commonFn";
import { setCookie } from "@/utils/cookiesHandler";
import { useSearchParams, useRouter } from "next/navigation";

export default function Register() {
  const searchParams = useSearchParams();
  const getSSOCode = searchParams.get("code");
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    isSsoLoading: getSSOCode ? true : false,
    hidden: {},
    disabled: {},
  });
  const [ssoUrl, setSSOUrl] = useState();
  const [modal, setModal] = useState({
    open: false,
    title: "Error",
    width: 400,
  });
  const { setSnackBarMessage } = useContext(CommonContext);
  const router = useRouter();

  const customSignup = async (data) => {
    if (data.password !== data.confirm_password) {
      setActionHandler((val) => ({
        ...val,
        error: "New password and confirm password are not matched",
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
    onRegister(apiList.signup, data, true);
  };

  const setDisabledSso = (isDisabled) => {
    setActionHandler((val) => ({
      ...val,
      disabled: { ...val.disabled, google: isDisabled },
      isSsoLoading: isDisabled,
    }));
  };

  const fetchSSOUrl = async () => {
    const response = await getService(apiList.ssoUrl);
    const result = response[0].data;
    if (result) {
      setSSOUrl(result);
    } else {
      setActionHandler((val) => ({
        ...val,
        disabled: { ...val.disabled, google: true },
      }));
    }
  };

  const onRegister = async (url, data, isCustomSignup) => {
    const response = await postService(url, data);

    if (response[0]?.data?.access_token) {
      setCookie("_d", response[0]?.data?.access_token);
      setAccessToken({
        ...response[0]?.data,
        display_name: isCustomSignup
          ? `${data.first_name} ${data.last_name}`
          : null,
      });
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      setDisabledSso(false);
      setActionHandler((val) => ({
        ...val,
        isLoading: false,
        isSsoLoading: false,
      }));
      if (!isCustomSignup) {
        fetchSSOUrl();
        router.replace("/");
        setModal((val) => ({
          ...val,
          open: true,
          error: response[1]?.message,
        }));
      } else {
        setActionHandler((val) => ({ ...val, error: response[1]?.message }));
      }
    }
  };

  useEffect(() => {
    if (getSSOCode) {
      setDisabledSso(true);
      onRegister(apiList.ssoSignup, {
        authorization_code: getSSOCode,
      });
    } else {
      setCookie("page", "register");
      fetchSSOUrl();
    }
  }, [getSSOCode]);

  return (
    <>
      <Modal
        {...modal}
        closeModal={() => {
          setModal((val) => ({ ...val, open: false }));
        }}
      >
        <div className="error">{modal.error}</div>
      </Modal>

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
    </>
  );
}
