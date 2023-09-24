import React, { useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { CommonContext } from "@/components/commonProvider";

const Alert = React.forwardRef(function (props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

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
        open={message ? true : false}
        autoHideDuration={time}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {message ? (
          <Alert onClose={handleClose} severity={severity || "success"}>
            {message}
          </Alert>
        ) : null}
      </Snackbar>
    </div>
  );
};
