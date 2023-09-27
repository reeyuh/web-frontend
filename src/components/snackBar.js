import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { CommonContext } from "@/components/commonProvider";

const AlertMessage = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

AlertMessage.displayName = "AlertMessage";

export const CustomSnackbar = () => {
  const {
    snackBarMessage: { time, severity, message },
    setSnackBarMessage,
  } = useContext(CommonContext);

  const handleClose = () => {
    setSnackBarMessage({ message: "" });
  };

  return (
    <div>
      <Snackbar
        className="mb-4"
        open={message ? true : false}
        autoHideDuration={time}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {message ? (
          <AlertMessage onClose={handleClose} severity={severity || "success"}>
            {message}
          </AlertMessage>
        ) : null}
      </Snackbar>
    </div>
  );
};
