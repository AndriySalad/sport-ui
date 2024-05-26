import React, { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Tooltip,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { IUserProfileDate } from "../../utils/UserUtils";
import axiosInstance from "../../utils/Api";
import { useAuth } from "../../utils/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProfileSettingsProps {
  user: IUserProfileDate | null;
}

const ProfileSettings = ({ user }: IProfileSettingsProps) => {
  const { setUserProfileData } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    email: user?.email,
    phone: user?.phone,
    goalDescription: user?.goalDescription,
    experienceDescription: user?.experienceDescription,
    injuryDescription: user?.injuryDescription,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuillChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        "/api/v1/user-profile",
        formData
      );
      if (response.status === 200) {
        setUserProfileData(response.data);
      }
    } catch (error) {}
    console.log("Updated profile data:", formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone number"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" margin="normal">
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Goals
            </Typography>
            <Tooltip title="Describe your goals, for example, how much weight you want to lose or how far you want to run. You should also specify a time frame for these goals (but this is optional).">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <ReactQuill
            value={formData.goalDescription}
            onChange={(value) => handleQuillChange("goalDescription", value)}
            theme="snow"
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" margin="normal">
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Experience
            </Typography>
            <Tooltip title="Describe your previous experience, for example, how many years you have been playing sports and what achievements you have. Or how many years you've been a coach, who you've coached and what successes your athletes have achieved.">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <ReactQuill
            value={formData.experienceDescription}
            onChange={(value) =>
              handleQuillChange("experienceDescription", value)
            }
            theme="snow"
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" margin="normal">
            <Typography variant="subtitle1" sx={{ mr: 1 }}>
              Injuries
            </Typography>
            <Tooltip title="Describe your injuries, for example, what injuries you have had and how they affect your training. It is also worth mentioning your health restrictions and any instructions from your doctors.">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <ReactQuill
            value={formData.injuryDescription}
            onChange={(value) => handleQuillChange("injuryDescription", value)}
            theme="snow"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4, display: "block", mx: "auto" }}
          >
            Save changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileSettings;
