"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";

const VerificationPage = ({ params }) => {
  const router = useRouter();
  const { token } = params;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .post('/api/verify', { token })
        .then(() => {
          setSuccess(true);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    setTimeout(() => {
      router.push('/sign-in');
    }, 3000);
  }, [token, router]);

  return (
    <Grid container maxWidth="xl" className="layout-container">
      <Grid item xs={12} sm={10} md={6} lg={5} xl={5}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <CircularProgress /> <p>Verifying user ...</p>
          </div>
        ) : success ? (
          <Alert severity="success">Verification successful. Redirecting...</Alert>
        ) : (
          <Alert severity="error">Verification failed. Please try again.  Redirecting...</Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default VerificationPage;
