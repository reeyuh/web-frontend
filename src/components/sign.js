"use client";
import { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./primaryButton";
import { OutlinedInputWrapper } from "./muiOverWrite";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import GoogleLogo from "@/assets/images/google-logo.png";
import "@/styles/sign.scss";

export const Sign = ({
  formInputs,
  sendForm = () => {},
  googleSSO = () => {},
  actionHandler = {},
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const { error, success, hidden, disabled, isLoading, isSsoLoading } =
    actionHandler;

  return (
    <Grid container className={formInputs?.className}>
      <Grid item xs={12} sm={10} md={8} lg={5} xl={5}>
        <form autoComplete="off" onSubmit={handleSubmit(sendForm)}>
          <Card>
            <CardContent>
              <div className="d-flex align-items-center">
                <Image src={Logo} alt="Logo" height={50} />
                <h1 className="logo-text">TrueNil</h1>
              </div>
              <h5 className={formInputs.header?.heading?.className}>
                {formInputs.header?.heading?.title}
              </h5>
              <Box>
                <p className={formInputs.header?.subheading?.className}>
                  {formInputs.header?.subheading?.title}
                </p>
              </Box>

              {formInputs.header?.googleSSO?.title && (
                <>
                  <div className="d-flex justify-content-center my-4">
                    {isSsoLoading ? (
                      <CircularProgress className="text-center" />
                    ) : (
                      <div onClick={googleSSO}>
                        <PrimaryButton
                          withIcon
                          type="button"
                          class="px-3"
                          disabled={disabled?.google}
                        >
                          <Image
                            src={GoogleLogo}
                            alt="Google Logo"
                            width={24}
                            height={24}
                            className="p-1 bg-white rounded-circle"
                          />
                          <p className="mb-0 ps-2 text-white">
                            {formInputs.header?.googleSSO?.title}
                          </p>
                        </PrimaryButton>
                      </div>
                    )}
                  </div>
                  <Divider flexItem>OR</Divider>
                </>
              )}
              <Grid container spacing={1} className="mb-4">
                {formInputs?.data?.map((inputVal, index) => {
                  if (hidden[inputVal?.name]) {
                    return false;
                  }
                  const inputRegister = register(inputVal?.name, {
                    required: inputVal?.isRequired,
                    pattern: inputVal.pattern,
                    minLength: inputVal?.minLength || 0,
                    ...(inputVal?.maxLength > 0
                      ? { maxLength: inputVal?.maxLength }
                      : {}),
                  });
                  return (
                    <Grid
                      key={index}
                      item
                      xs={inputVal?.xs || 12}
                      sm={inputVal?.sm || 12}
                      md={inputVal?.md || 12}
                      lg={inputVal?.lg || 12}
                      xl={inputVal?.xl || 12}
                      className={inputVal?.formControlClass}
                    >
                      <OutlinedInputWrapper
                        className={inputVal?.fieldClass}
                        type={inputVal?.type}
                        name={inputVal?.name}
                        placeholder={inputVal?.placeholder}
                        {...inputRegister}
                        onChange={(e) => {
                          inputRegister.onChange(e);
                        }}
                        inputProps={{
                          ...(inputVal?.maxLength > 0
                            ? { maxLength: inputVal?.maxLength }
                            : {}),
                          disabled: [inputVal?.name]?.disabled,
                        }}
                      />

                      {inputVal?.errors?.map((error, eindex) => (
                        <span key={eindex}>
                          {errors[inputVal?.name]?.type === error?.type && (
                            <span className="error mt-1 d-inline-block">
                              {error?.message}
                            </span>
                          )}
                        </span>
                      ))}
                    </Grid>
                  );
                })}
              </Grid>

              {/* response error message */}
              <Box className={formInputs?.header?.className}>
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Box>

              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {formInputs?.footer?.buttonText?.title &&
                    !hidden?.btnSection && (
                      <Box
                        display="flex"
                        mt={4}
                        justifyContent="space-between"
                        alignItems={"center"}
                      >
                        <PrimaryButton
                          type="submit"
                          text={formInputs?.footer?.buttonText?.title}
                          class="me-3"
                        />
                        {formInputs?.footer?.link?.url && (
                          <Link href={formInputs?.footer?.link?.url}>
                            {formInputs?.footer?.link?.title}
                          </Link>
                        )}
                        {!formInputs?.footer?.link?.url &&
                          formInputs?.footer?.link?.title && (
                            <p>{formInputs?.footer?.link?.title}</p>
                          )}
                      </Box>
                    )}
                </>
              )}
            </CardContent>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};
