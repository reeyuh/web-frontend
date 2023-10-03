"use client";

import { createContext, useState } from "react";
import { CustomSnackbar } from "@/components/snackBar";

export const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
  const [snackBarMessage, setSnackBarMessage] = useState({});
  return (
    <CommonContext.Provider value={{ snackBarMessage, setSnackBarMessage }}>
      {children}
      <CustomSnackbar />
    </CommonContext.Provider>
  );
};
