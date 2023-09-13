"use client";

import { useState } from "react";
import { Sign } from "@/components";
import { RESET_PASSWORD_FORM } from "@/data/SignData";

export default function ResetUser() {
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const sendForm = () => { };

    return (
        <Sign
            formInputs={RESET_PASSWORD_FORM}
            error={error}
            success={success}
            sendForm={sendForm}
        />
    );
}