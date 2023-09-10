"use client";

import { OutlinedInput } from "@mui/material";
import styled from "@emotion/styled";

export const OutlinedInputWrapper = styled(OutlinedInput)`
  height: 48px;
  &:hover {
    opacity: 0.9;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 20%) !important;
  }
`;
