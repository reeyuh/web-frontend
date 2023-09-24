"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { FORGOT_FORM_INPUTS } from "@/data/SignData";
import { useRouter } from "next/navigation";
import { postService } from "@/utils/httpService";
import { baseApiServer } from "@/utils/enviroment";
import { apiList } from "@/utils/apiList";

export default function ForgotPassword() {
  const router = useRouter();
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
  });

  const onForgotPassword = async (data) => {
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));
    const response = await postService(
      `${baseApiServer}${apiList.sendOtp}`,
      data
    );
    setActionHandler((val) => ({
      ...val,
      isLoading: false,
    }));
    if (response[0]?.data) {
      const message =
        "OTP sent successfully, redirecting to reset password page...";
      setActionHandler((val) => ({
        ...val,
        success: message,
        hidden: { btnSection: true },
      }));
      setTimeout(() => {
        router.replace("/reset-password");
      }, 3000);
    } else {
      setActionHandler((val) => ({ ...val, error: response[1]?.message }));
    }
  };

  return (
    <Sign
      formInputs={FORGOT_FORM_INPUTS}
      sendForm={onForgotPassword}
      actionHandler={actionHandler}
    />
  );
}
