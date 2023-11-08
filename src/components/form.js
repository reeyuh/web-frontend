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
  MenuItem,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
  SelectWrapper,
} from "@/components";

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
                  type={btn.type || "submit"}
                />
              ) : (
                <PrimaryButton
                  class="me-3"
                  text={btn.text}
                  type={btn.type || "submit"}
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
  formSubmit = () => {},
  btnList,
  values,
  actionHandler = {},
  options = {},
}) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: values,
  });

  const { error, success, hidden, disabled, isLoading, readonly } =
    actionHandler;
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(formSubmit)}>
        <Card
          sx={{ overflow: "visible" }}
          className={`${list?.cardClass ? list.cardClass : ""}`}
        >
          <CardContent
            className={`${list?.contentClass ? list.contentClass : ""}`}
          >
            {list?.groups?.map((group, index) => (
              <FormGroup
                className={`${list?.formGroup ? list.fromGroup : ""}`}
                key={index}
              >
                {group.name && (
                  <h5 className="form-group-name mb-3">{group.name}</h5>
                )}
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

                          {field?.type === "textarea" && (
                            <textarea {...inputRegister} {...otherProps} />
                          )}

                          {field?.type == "select" && (
                            <Controller
                              name={field?.name}
                              rules={{
                                required: field?.isRequired,
                              }}
                              control={control}
                              render={(controlField) => (
                                <SelectWrapper
                                  readOnly={readonly?.[field?.name]}
                                  variant="standard"
                                  className={`form-control ${
                                    readonly?.[field?.name] ? "read-only" : ""
                                  }`}
                                  {...controlField.field}
                                >
                                  {field.defaultValue && (
                                    <MenuItem value="">
                                      {field.defaultValue}
                                    </MenuItem>
                                  )}
                                  {options?.[field.name]?.map(
                                    (option, index) => (
                                      <MenuItem
                                        key={`option_${index}`}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    )
                                  )}
                                </SelectWrapper>
                              )}
                            />
                          )}

                          {field?.errors?.map(
                            (error, eindex) =>
                              errors[field?.name]?.type === error?.type && (
                                <span
                                  key={eindex}
                                  className="error mt-1 d-inline-block"
                                >
                                  {error?.message}
                                </span>
                              )
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                {/* response error message */}
                {(success || error) && (
                  <Box className="mx-md-2 mx-0 px-md-2 py-3">
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                  </Box>
                )}

                {!hidden?.btnSection && group?.btnList?.length > 0 && (
                  <Btns isLoading={isLoading} list={group?.btnList || []} />
                )}
              </FormGroup>
            ))}

            <>
              {!hidden?.btnSection && btnList?.length > 0 && (
                <Btns isLoading={isLoading} list={btnList} />
              )}
            </>
          </CardContent>
        </Card>
      </form>
    </>
  );
};
