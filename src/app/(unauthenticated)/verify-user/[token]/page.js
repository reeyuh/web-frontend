"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { getService, postService } from "@/utils/httpService";
import { apiList } from "@/utils/apiList";

const VerificationPage = ({ params }) => {
  const router = useRouter();
  const { token } = params;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const onVerifyEmail = async () => {
    const response = await getService(apiList.verifyEmail, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    if (response[0]?.data) {
      setSuccess(true);
    }
    setTimeout(() => {
      router.replace("/sign-in");
    }, 3000);
  };

  useEffect(() => {
    onVerifyEmail();
  }, []);

  return (
    <Grid container maxWidth="xl" className="verify-user-container">
      <Grid item xs={12} sm={10} md={6} lg={5} xl={5}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <CircularProgress /> <p>Verifying user ...</p>
          </div>
        ) : success ? (
          <Alert severity="success">
            Verification successful. Redirecting to sign in or dashboard page...
          </Alert>
        ) : (
          <Alert severity="error">
            Verification failed. Please try again. Redirecting to sign in or
            dashboard page...
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default VerificationPage;
