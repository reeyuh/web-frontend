import {
  Box,
  CircularProgress,
  FormControlLabel,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  FormGroup,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { PrimaryButton } from "@/components";
import { VALIDATION } from "@/data/commonData";
import QRCode from "qrcode";
import styled from "@emotion/styled";

const LabelWrapper = styled(FormControlLabel)`
  span {
    font-family: inherit;
  }
`;

export const MfaOptions = ({ values, fetchProfile }) => {
  const {
    control: otpControl,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    watch,
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: { mfa_type: values.mfa_type },
    mode: "all",
    reValidateMode: "onChange",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrcodeUrl, setqrCodeUrl] = useState("");

  const onEnabledMfa = async (data) => {
    setIsLoading(true);

    if (data.otp) {
      const response = await postService(apiList.verifyMfaOtp, data);
      if (response[1]) {
        setIsLoading(false);
        setError(response[1].message);
        return;
      }
    }

    const response = await postService(apiList.enableMfa, data);
    setIsLoading(false);
    if (response[0]) {
      setSuccess(
        `multi-factor authentication has been successfully ${
          values?.mfa_type ? "updated" : "activated"
        }`
      );

      setTimeout(() => {
        data.otp && fetchProfile();
        setSuccess("");
      }, 3000);
    } else {
      setError(response[1].message);
    }
  };

  const generateBarCode = async () => {
    const response = await getService(apiList.getQRlink);
    if (response[0]?.data?.uri) {
      QRCode.toDataURL(response[0].data.uri).then(setqrCodeUrl);
    }
  };

  useEffect(() => {
    if (!qrcodeUrl && values?.mfa_verified === false) {
      generateBarCode();
    }
  }, [values]);

  return (
    <form autoComplete="off" onSubmit={otpHandleSubmit(onEnabledMfa)}>
      <Card sx={{ overflow: "visible" }} className="common-card">
        <CardContent className="p-md-3 p-0">
          <FormGroup className="form-group mb-md-3 mb-0">
            <h5 className="form-group-name mb-3">
              Multi-factor authentication setup
            </h5>
            <Box className="px-md-3 px-0 py-2">
              <RadioGroup value={watch()?.mfa_type} name={"mfa_type"}>
                <div>
                  <Controller
                    key={"email"}
                    name={"mfa_type"}
                    control={otpControl}
                    render={({ field: { onChange, ref } }) => (
                      <LabelWrapper
                        className="form-label mb-0"
                        value={"email"}
                        control={<Radio />}
                        onChange={(e) => {
                          onChange(e);
                          setError();
                        }}
                        label={
                          "Send a one time passcode to the registered email address"
                        }
                        inputRef={ref}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    key={"authenticator"}
                    name={"mfa_type"}
                    control={otpControl}
                    render={({ field: { onChange, ref } }) => (
                      <LabelWrapper
                        className="form-label"
                        value={"authenticator"}
                        control={<Radio />}
                        onChange={(e) => {
                          onChange(e);
                          setError();
                        }}
                        label={`${
                          values?.mfa_verified ? "Use" : "Setup"
                        }  a mobile authenticator for one time passcode`}
                        inputRef={ref}
                      />
                    )}
                  />
                  {!values?.mfa_verified &&
                    watch()?.mfa_type === "authenticator" && (
                      <Box>
                        <ul>
                          <li className="mb-3">
                            <p>
                              Install <span className="form-label">Google</span>{" "}
                              or <span className="form-label">Yubico </span>
                              Authenticator on your mobile to get your
                              verification code.
                            </p>
                          </li>
                          <li className="mb-3">
                            <p>
                              Open the application and scan the below barcode QR
                              code.
                            </p>
                            <div>
                              {qrcodeUrl && (
                                <img
                                  className="mt-1"
                                  src={qrcodeUrl}
                                  alt="qrcode url"
                                />
                              )}
                            </div>
                          </li>

                          <li className="mb-3">
                            <p className="mb-2">
                              Enter One Time Password(OTP) provided by
                              Authenticator application and click verify to
                              complete the setup.
                            </p>
                            <input
                              className="form-control w-auto"
                              placeholder="OTP"
                              {...register("otp", {
                                required: "Please enter six digit",
                                pattern: {
                                  value: VALIDATION.OTP,
                                  message:
                                    "One Time Password should be six digit",
                                },
                                minLength: 6,
                              })}
                              maxLength="6"
                            />
                            <div className="error mt-2">
                              {otpErrors["otp"]?.message}
                            </div>
                          </li>
                        </ul>
                      </Box>
                    )}
                </div>
              </RadioGroup>
              {(success || error) && (
                <Box className="pt-3">
                  {success && <Alert severity="success">{success}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}
                </Box>
              )}
              {!isLoading ? (
                <>
                  {!success &&
                    watch().mfa_type &&
                    values.mfa_type !== watch()?.mfa_type && (
                      <div className="mt-4">
                        <PrimaryButton
                          type="submit"
                          text={`${
                            watch()?.mfa_type === "email" ||
                            values?.mfa_verified
                              ? "Submit"
                              : "Verify"
                          }`}
                        />
                      </div>
                    )}
                </>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </FormGroup>
        </CardContent>
      </Card>
    </form>
  );
};
