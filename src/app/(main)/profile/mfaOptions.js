import {
  Box,
  CircularProgress,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
  Card,
  CardContent,
  FormGroup,
  Grid,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";
import { PrimaryButton } from "@/components";
import { VALIDATION } from "@/data/CommonData";
import QRCode from "qrcode";
import styled from "@emotion/styled";

const LabelWrapper = styled(FormControlLabel)`
  span {
    font-family: inherit;
  }
`;

export const MfaOptions = ({ values }) => {
  const {
    control: otpControl,
    handleSubmit: otpHandleSubmit,
    formState: { errors: otpErrors },
    watch: otpWatch,
    reset: otpReset,
    setValue: otpSetValue,
    register,
  } = useForm({
    defaultValues: { mfa_type: values.mfa_enabled },
    mode: "all",
    reValidateMode: "onChange",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrcodeUrl, setqrCodeUrl] = useState("");

  const onEnabledMfa = async (data) => {
    setIsLoading(true);
    const response = await postService(apiList.enableMfa, data);
    setIsLoading(false);
    if (response[0]) {
      setSuccess("multi-factor authentication has been successfully activated");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } else {
      setError(response[1].message);
    }
  };

  const generateBarCode = async () => {
    const response = await getService(apiList.getQRlink);
    if (response[0]) {
      QRCode.toDataURL(response.data.url).then(setqrCodeUrl);
    }
  };

  useEffect(() => {
    if (!qrcodeUrl) {
      generateBarCode();
    }
  }, []);

  return (
    <form autoComplete="off" onSubmit={otpHandleSubmit(onEnabledMfa)}>
      <Card sx={{ overflow: "visible" }} className="form-card">
        <CardContent className="p-md-3 p-0">
          <FormGroup className="form-group mb-md-3 mb-0">
            <h5 className="form-group-name mb-3">
              Multi-factor authentication setup
            </h5>
            <Box className="px-md-3 px-0 py-2">
              <RadioGroup value={otpWatch()?.mfa_type} name={"mfa_type"}>
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
                        label={
                          "Setup a mobile authenticator for one time passcode"
                        }
                        inputRef={ref}
                      />
                    )}
                  />
                  <Box>
                    <ul>
                      <li className="mb-3">
                        <p>
                          Install <span className="form-label">Google</span> or{" "}
                          <span className="form-label">Yubico </span>
                          Authenticator on your mobile to get your verification
                          code.
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
                          Enter One Time Password(OTP) provided by Authenticator
                          application and click verify to complete the setup.
                        </p>
                        <input
                          className="form-control w-auto"
                          placeholder="OTP"
                          {...register("totp", {
                            required: "Please enter six digit",
                            pattern: {
                              value: VALIDATION.OTP,
                              message: "One Time Password should be six digit",
                            },
                            minLength: 6,
                          })}
                          maxLength="6"
                        />
                        <div className="error mt-2">
                          {otpErrors["totp"]?.message}
                        </div>
                      </li>
                    </ul>
                  </Box>
                </div>
              </RadioGroup>
              {!isLoading ? (
                <>
                  {!success && (
                    <div className="mt-4">
                      <PrimaryButton type="submit" text="Verify" />
                    </div>
                  )}
                </>
              ) : (
                <CircularProgress />
              )}
            </Box>

            {/* response error message */}
            {(success || error) && (
              <Box className="mx-md-2 mx-0 px-md-2 pt-3">
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
            )}
          </FormGroup>
        </CardContent>
      </Card>
    </form>
  );
};
