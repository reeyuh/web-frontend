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
  line-height: 1.5 !important;
  height: 38px !important;
  font-size: 14px !important;
  margin-top: 1px !important;
  border-radius: 0.2rem !important;

  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 20%) !important;
  }
  &.view-close {
    background-color: ${colors.white} !important;
    color: ${colors.primary} !important;
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

export default PrimaryButton;
