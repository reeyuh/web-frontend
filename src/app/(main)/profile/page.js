import { Form } from "@/components";
import { PROFILE_INPUTS, CHANGE_PASSWORD_INPUTS } from "@/data/ProfileData";

export default function Profile() {
  return (
    <>
      <Form list={PROFILE_INPUTS} />
      <Form list={CHANGE_PASSWORD_INPUTS} />
    </>
  );
}
