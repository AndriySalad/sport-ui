import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Api";
import { useForm } from "react-hook-form";

export interface LoginProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    setError("");
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/authenticate",
        data
      );
      localStorage.setItem("token", response.data.access_token);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          sx={{
            height: "500px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>

          <Box mt={5}>
            <Typography variant="body2">
              Don't have an account? <Link to={"/register"}>Register</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
