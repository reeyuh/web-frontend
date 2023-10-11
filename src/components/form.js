"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Box,
  FormGroup,
  Alert,
  CircularProgress,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/components/primaryButton";
import { PrimaryOutlinedButton } from "@/components/primaryButton";

export const Btns = ({ list = [], isLoading }) => {
  return (
    <Box className="mx-md-2 mx-0 px-md-2 py-3 d-flex">
      {isLoading && list?.length > 0 ? (
        <CircularProgress className="text-center" />
      ) : (
        <>
          {list?.map((btn, index) => (
            <Box key={`btn_${index}`}>
              {btn.btnType === "outlined" ? (
                <PrimaryOutlinedButton
                  class="me-3"
                  text={btn.text}
                  type={btn.btnType || "submit"}
                />
              ) : (
                <PrimaryButton
                  class="me-3"
                  text={btn.text}
                  type={btn.btnType || "submit"}
                />
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export const Form = ({
  list,
  formSubmit = () => { },
  btnList,
  values,
  actionHandler = {},
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: values,
  });

  const { error, success, hidden, disabled, isLoading, readonly } =
    actionHandler;

  const handleSelectChange = (fieldName, e) => {
    setValue(fieldName, e.target.value);
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(formSubmit)}>
        <Card sx={{ overflow: "visible" }} className="common-card">
          <CardContent className="p-md-3 p-0">
            {list?.map((group, index) => (
              <FormGroup className="form-group mb-md-3 mb-0" key={index}>
                <h5 className="form-group-name mb-3">{group.name}</h5>
                <Grid container spacing={1}>
                  {group.fields.map((field, childIndex) => {
                    const inputRegister = register(field?.name, {
                      required: field?.isRequired,
                      pattern: field.pattern,
                      minLength: field?.minLength || 0,
                      ...(field?.maxLength > 0
                        ? { maxLength: field?.maxLength }
                        : {}),
                    });

                    const otherProps = {
                      className: `form-control ${field?.fieldClass}`,
                      type: field?.type,
                      placeholder: field?.placeholder,
                      maxLength: field?.maxLength,
                      onChange: (e) => {
                        inputRegister.onChange(e);
                      },
                      readOnly: readonly?.[field?.name],
                    };
                    return (
                      <Grid
                        item
                        xs={field?.xs || 12}
                        sm={field?.sm || 12}
                        md={field?.md || 6}
                        lg={field?.lg || 4}
                        xl={field?.xl || 4}
                        key={childIndex}
                      >
                        <Box className="px-md-3 px-0 py-2">
                          <label className="form-label">{field?.label}</label>
                          {(field?.type === "text" ||
                            field?.type === "password" ||
                            field?.type === "number" ||
                            field?.type === "date") && (
                              <input {...inputRegister} {...otherProps} />
                            )}

                          {field?.type == "select" && (
                            <FormControl fullWidth>
                              <Select
                                {...inputRegister}
                                {...otherProps}
                                value={watch(field?.name) || "select"}
                                onChange={(e) => handleSelectChange(field?.name, e)}
                                sx={{
                                  "& .MuiSelect-root": {
                                    padding: 0,
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    padding: "1px 12px",
                                  }
                                }}
                              >
                                <MenuItem value="select">Select</MenuItem>
                                {field?.options.map((option, index) => (
                                  <MenuItem
                                    key={`option_${index}`}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}

                          {field?.errors?.map((error, eindex) => (
                            <span key={eindex}>
                              {errors[field?.name]?.type === error?.type && (
                                <span className="error mt-1 d-inline-block">
                                  {error?.message}
                                </span>
                              )}
                            </span>
                          ))}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                {/* response error message */}
                {(success || error) && (
                  <Box className="mx-md-2 mx-0 px-md-2 pt-3">
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                  </Box>
                )}

                {!hidden?.btnSection && (
                  <Btns isLoading={isLoading} list={group?.btnList || []} />
                )}
              </FormGroup>
            ))}

            <>
              {!hidden?.btnSection && (
                <Btns isLoading={isLoading} list={btnList} />
              )}
            </>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
