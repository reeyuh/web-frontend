"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { RESET_PASSWORD_FORM } from "@/data/SignData";
import { useRouter } from "next/navigation";
import { postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";

export default function ResetUser() {
  const router = useRouter();
  const [inputFields, setInputFields] = useState(RESET_PASSWORD_FORM);
  const [secondStep, setSecondStep] = useState(false);
  const [formData, setFormData] = useState({});
  const [actionHandler, setActionHandler] = useState({
    error: "",
    success: "",
    isLoading: false,
    hidden: { new_password: true, confirm_password: true },
    disabled: {},
  });

  const onResetPassword = async (data) => {
    if (data.new_password !== data.confirm_password) {
      setActionHandler((val) => ({
        ...val,
        error: "New password and confirm password are not matched",
      }));
      return;
    }

    if (!secondStep) {
      setActionHandler((val) => ({
        ...val,
        isLoading: true,
        hidden: { ...val.hidden, btnSection: true },
      }));
      const response = await postService(apiList.verifyOtp, {
        ...formData,
        ...data,
      });
      setActionHandler((val) => ({
        ...val,
        isLoading: false,
      }));

      if (response[0]) {
        setFormData(data);
        setSecondStep(true);
        setInputFields((inputs) => ({
          ...inputs,
          footer: {
            ...inputs.footer,
            link: {
              ...inputs.footer.link,
              title: "Step 2 of 2",
            },
            buttonText: { ...inputs.footer.buttonText, title: "Submit" },
          },
        }));
        setActionHandler((val) => ({
          ...val,
          success: "OTP verified successfully, redirecting to next step...",
        }));

        setTimeout(() => {
          setActionHandler((val) => ({
            ...val,
            success: "",
            hidden: {
              new_password: false,
              confirm_password: false,
              email: true,
              otp: true,
              btnSection: false,
            },
          }));
        }, 2000);
      } else {
        setActionHandler((val) => ({
          ...val,
          error: response[1].message,
        }));
      }

      return;
    }

    setActionHandler((val) => ({
      ...val,
      isLoading: true,
      success: "",
      error: "",
    }));
    const response = await postService(apiList.resetPassword, {
      ...formData,
      ...data,
    });
    setActionHandler((val) => ({
      ...val,
      isLoading: false,
    }));
    if (response[0]) {
      const message =
        "reset password successfully, redirecting to sign in page...";
      setActionHandler((val) => ({
        ...val,
        success: message,
        hidden: { ...val.hidden, btnSection: true },
      }));
      setTimeout(() => {
        router.replace("/sign-in");
      }, 3000);
    } else {
      setSecondStep(false);
      setInputFields((inputs) => ({
        ...inputs,
        footer: {
          ...inputs.footer,
          buttonText: { ...inputs.footer.buttonText, title: "Verify" },
        },
      }));
      setActionHandler((val) => ({
        ...val,
        error: response[1]?.message,
        hidden: {
          new_password: true,
          confirm_password: true,
          email: false,
          otp: false,
        },
      }));
    }
  };
  return (
    <Sign
      formInputs={inputFields}
      sendForm={onResetPassword}
      actionHandler={actionHandler}
    />
  );
}
