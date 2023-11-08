"use client";

import { createContext, useState } from "react";
import { CustomSnackbar } from "@/components/snackBar";

export const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
  const [snackBarMessage, setSnackBarMessage] = useState({});
  const [fns, setFns] = useState(null);

  return (
    <CommonContext.Provider
      value={{
        snackBarMessage,
        setSnackBarMessage,
        fns,
        setFns,
      }}
    >
      {children}
      <CustomSnackbar />
    </CommonContext.Provider>
  );
};
