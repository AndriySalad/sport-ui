import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import axiosInstance from "../utils/Api";

const StravaCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const sendRequest = async () => {
      if (code) {
        try {
          const response = await axiosInstance.get(
            `/api/strava/callback?code=${code}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Strava callback response:", response.data);
          navigate("/");
        } catch (err) {
          console.error("Error during Strava callback:", err);
          setError(true);
          setLoading(false);
        }
      } else {
        setError(true);
        setLoading(false);
      }
    };

    sendRequest();
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        bgcolor="#f9f9f9"
        p={4}
        borderRadius={2}
        boxShadow={3}
      >
        {loading && <CircularProgress color="secondary" />}
        {loading && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            Processing Strava callback...
          </Typography>
        )}
        {!loading && error && (
          <>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              An error occurred during Strava callback.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default StravaCallback;
