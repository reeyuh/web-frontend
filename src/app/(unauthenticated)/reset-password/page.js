"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { RESET_PASSWORD_FORM } from "@/data/SignData";
import { useRouter } from "next/navigation";
import { postService } from "@/utils/httpService";
import { baseApiServer } from "@/utils/enviroment";
import { apiList } from "@/utils/apiList";

export default function ResetUser() {
  const router = useRouter();
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
  });

  const onResetPassword = async (data) => {
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));
    const response = await postService(
      `${baseApiServer}${apiList.resetPassword}`,
      data
    );
    setActionHandler((val) => ({
      ...val,
      isLoading: false,
    }));
    if (response[0]?.data) {
      const message =
        "reset password successfully, redirecting to sign in page...";
      setActionHandler((val) => ({
        ...val,
        success: message,
        hidden: { btnSection: true },
      }));
      setTimeout(() => {
        router.replace("/sign-in");
      }, 3000);
    } else {
      setActionHandler((val) => ({ ...val, error: response[1]?.message }));
    }
  };
  return (
    <Sign
      formInputs={RESET_PASSWORD_FORM}
      sendForm={onResetPassword}
      actionHandler={actionHandler}
    />
  );
}
