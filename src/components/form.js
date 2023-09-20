"use client";
import React from "react";
import { Card, CardContent, Grid, Box, FormGroup } from "@mui/material";

import { useForm } from "react-hook-form";
import { PrimaryButton } from "@/components/primaryButton";
import { PrimaryOutlinedButton } from "@/components/primaryButton";

export const Btns = ({ list = [] }) => {
  return (
    <>
      {list?.map((btn, index) => (
        <Box className="mx-md-2 mx-0 px-md-2 py-3" key={index}>
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
  );
};

export const Form = ({ list, formSubmit = () => {}, btnList }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(formSubmit)}>
        <Card sx={{ overflow: "visible" }} className="form-card">
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
                      name: field?.name,
                      placeholder: field?.placeholder,
                      maxLength: field?.maxLength,
                      onChange: (e) => {
                        inputRegister.onChange(e);
                      },
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
                            field?.type === "password") && (
                            <input {...inputRegister} {...otherProps} />
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                <Btns list={group?.btnList || []} />
              </FormGroup>
            ))}
            <Btns list={btnList} />
          </CardContent>
        </Card>
      </form>
    </>
  );
};
