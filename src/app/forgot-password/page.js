import { Sign } from "@/components";
import { FORGOT_FORM_INPUTS } from "@/data/SignData";

export default function ForgotPassword() {
  return (
    <>
      <Sign formInputs={FORGOT_FORM_INPUTS} />
    </>
  );
}
