"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { MFA_FORM_INPUTS } from "@/data/SignData";
import { useRouter } from "next/navigation";
import { postService } from "@/utils/httpService";
import { baseApiServer } from "@/utils/enviroment";
import { apiList } from "@/utils/apiList";
import { setAccessToken, getLocalStore } from "@/utils/commonFn";
import { setCookie } from "@/utils/cookiesHandler";

export default function MFA() {
  const router = useRouter();
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
  });

  const onMfa = async (data) => {
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));
    const response = await postService(`${baseApiServer}${apiList.mfaLogin}`, {
      ...data,
      email: getLocalStore("email"),
    });

    if (response[0]?.data.access_token) {
      setAccessToken(response[0].data);
      await setCookie("_d", response[0].data.access_token);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
    } else {
      setActionHandler((val) => ({
        ...val,
        isLoading: false,
        error: response[1]?.message,
      }));
    }
  };

  return (
    <Sign
      formInputs={MFA_FORM_INPUTS}
      sendForm={onMfa}
      actionHandler={actionHandler}
    />
  );
}
