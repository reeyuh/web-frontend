"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { REGISTER_FORM_INPUTS } from "@/data/SignData";

export default function Register() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const sendForm = () => {};

  return (
    <Sign
      formInputs={REGISTER_FORM_INPUTS}
      error={error}
      success={success}
      sendForm={sendForm}
    />
  );
}
