import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Api";
import { useForm } from "react-hook-form";

export interface RegisterProps {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const steps = ["Personal data", "Contact details", "Password"];

const Register: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = async (data: RegisterProps) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/registration",
        data
      );
      localStorage.setItem("token", response.data.access_token);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Registration failed. Please check your data and try again.");
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              key={"firstName"}
              label="First name"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
            />
            <TextField
              key={"lastName"}
              label="Last name"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
            />
            <TextField
              key={"role"}
              variant="outlined"
              margin="normal"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              {...register("role", { required: "Role is required" })}
              error={!!errors.role}
              helperText={errors.role ? errors.role.message : ""}
            >
              <option value="">What do you plan to do?</option>
              <option value="ROLE_USER">Train</option>
              <option value="ROLE_TRAINER">Coach someone</option>
            </TextField>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              key={"email"}
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
              key={"phone"}
              label="Phone number"
              variant="outlined"
              margin="normal"
              fullWidth
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ""}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              key={"password"}
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <TextField
              key={"confirmPassword"}
              label="Confirm password"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              {...register("confirmPassword", {
                required: "Password confirmation is required",
              })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          </>
        );
      default:
        return "Unknown step";
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
            height: "auto",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
            py: 3,
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Registration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ width: "100%", mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <Button type="submit" variant="contained" color="primary">
                  Registration
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
          <Box mt={5}>
            <Typography variant="body2">
              Already has an account? <Link to={"/login"}>Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
