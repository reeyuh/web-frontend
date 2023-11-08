"use client";

import { OutlinedInput, Select } from "@mui/material";
import styled from "@emotion/styled";

export const OutlinedInputWrapper = styled(OutlinedInput)`
  height: ${(props) => (props.height ? props.height : "48px")};
  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 20%) !important;
  }
`;

export const SelectWrapper = styled(Select)`
  font-family: inherit;
  & .MuiInputBase-input {
    padding: 0px !important;

    &:focus {
      background: none !important;
    }
  }
  &:after {
    content: none;
  }
  &:before {
    content: none;
  }
`;
