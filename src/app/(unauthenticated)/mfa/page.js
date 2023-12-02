"use client";

import { useEffect, useState } from "react";
import { Sign } from "@/components";
import { MFA_FORM_INPUTS } from "@/data/signData";
import { useRouter, useSearchParams } from "next/navigation";
import { postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { setInitialValues, getLocalStore } from "@/utils/commonFn";
import { setCookie } from "@/utils/cookiesHandler";

export default function MFA() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mfaType = searchParams.get("type");
  const [formInputs, setFormInputs] = useState(MFA_FORM_INPUTS);
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: {},
    disabled: {},
  });

  useEffect(() => {
    if (mfaType === "authenticator") {
      setFormInputs((val) => ({
        ...val,
        header: {
          ...val.header,
          subheading: {
            ...val.header.subheading,
            title: val.header.subheading.titleAuth,
          },
        },
      }));
    }
  }, []);

  const onMfa = async (data) => {
    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));
    const response = await postService(apiList.mfaLogin, {
      ...data,
      email: getLocalStore("email"),
    });

    if (response[0]?.data.access_token) {
      setInitialValues(response[0].data);
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
      formInputs={formInputs}
      sendForm={onMfa}
      actionHandler={actionHandler}
    />
  );
}
