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
/*"""
CommonContext: This createContext function creates a context object that can be used to share data and functions between components. It provides a way to pass props through the component tree without having to pass them manually at every level.

CommonProvider: This functional component serves as a provider for the CommonContext. It manages the state for snackbar messages and functions using the useState hook. It wraps its children components with CommonContext.Provider and passes down the snackBarMessage, setSnackBarMessage, fns, and setFns as context values.

snackBarMessage: This state variable holds the current snackbar message to be displayed.

setSnackBarMessage: This function is used to update the snackBarMessage state variable with a new message.

fns: This state variable holds functions that can be shared across components.

setFns: This function is used to update the fns state variable with new functions.

CustomSnackbar: This component is rendered within the CommonProvider to display snackbar messages. It receives snackBarMessage from the context and displays it as a snackbar notification.
"""*/