"use client";

import React from "react";
import styled from "@emotion/styled";
import { colors } from "../utils/theme";
import { Button } from "@mui/material";

const ButtonStyled = styled(Button)`
  background-color: ${colors.primary} !important;
  border-color: ${colors.primary} !important;
  color: ${colors.white} !important;
  text-transform: inherit !important;
  border-radius: 0.2rem !important;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 20%) !important;
  }
`;

export const PrimaryButton = (props) => {
  return props.withIcon ? (
    <ButtonStyled
      variant="outlined"
      type={props?.type || "submit"}
      hidden={props?.hidden}
      className={props.class}
      sx={props.sx}
    >
      {props?.children}
    </ButtonStyled>
  ) : (
    <ButtonStyled
      variant="outlined"
      type={props?.type || "submit"}
      hidden={props?.hidden}
      className={props.class}
      sx={props.sx}
    >
      {props?.text}
    </ButtonStyled>
  );
};

const ButtonOutlinedStyled = styled(Button)`
  background-color: ${colors.white} !important;
  border-color: ${colors.primary} !important;
  color: ${colors.primary} !important;
  text-transform: inherit !important;
  border-radius: 0.2rem !important;

  &:hover {
    background-color: ${colors.primary} !important;
    color: ${colors.white} !important;
  }
`;

export const PrimaryOutlinedButton = (props) => {
  return props.withIcon ? (
    <ButtonOutlinedStyled
      variant="outlined"
      type={props?.type || "submit"}
      hidden={props?.hidden}
      className={props.class}
      sx={props.sx}
    >
      {props?.children}
    </ButtonOutlinedStyled>
  ) : (
    <ButtonOutlinedStyled
      variant="outlined"
      type={props?.type || "submit"}
      hidden={props?.hidden}
      className={props.class}
      sx={props.sx}
    >
      {props?.text}
    </ButtonOutlinedStyled>
  );
};
