"use client";

import { Grid, Card, CardContent, Box, Divider, Alert } from "@mui/material";
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
  error,
  success,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <Grid container maxWidth="xl" className={formInputs?.className}>
      <Grid item xs={12} sm={10} md={6} lg={5} xl={5}>
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
                  <div
                    className="d-flex justify-content-center my-4"
                    onClick={googleSSO}
                  >
                    <PrimaryButton withIcon type="button" class="px-3">
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
                  <Divider flexItem>OR</Divider>
                </>
              )}

              {formInputs?.data?.map((inputVal, index) => {
                const inputRegister = register(inputVal?.name, {
                  required: inputVal?.isRequired,
                  pattern: inputVal.pattern,
                  minLength: inputVal?.minLength || 0,
                  ...(inputVal?.maxLength > 0
                    ? { maxLength: inputVal?.maxLength }
                    : {}),
                });
                return (
                  <Box key={index} className={inputVal?.formControlClass}>
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
                      }}
                    />

                    {inputVal?.errors?.map((error, eindex) => (
                      <span key={eindex}>
                        {errors[inputVal?.name]?.type === error?.type && (
                          <span className="error">{error?.message}</span>
                        )}
                      </span>
                    ))}
                  </Box>
                );
              })}

              {/* response error message */}
              <Box className={formInputs?.header?.className}>
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Box>

              {/* Button component */}
              {formInputs?.footer?.buttonText?.title && (
                <Box
                  display="flex"
                  mt={4}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <PrimaryButton
                    type="submit"
                    text={formInputs?.footer?.buttonText?.title}
                  />
                  {formInputs?.footer?.link?.url && (
                    <Link href={formInputs?.footer?.link?.url}>
                      {formInputs?.footer?.link?.title}
                    </Link>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};
