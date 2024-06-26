import React from "react";
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
  Link as MuiLink,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useEffect } from "react";
import axiosInstance from "../utils/Api";

const UserProfilePage = () => {
  const { user, setUserProfileData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/user-profile");

        setUserProfileData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    checkToken();
  }, []);

  const handleSettingsClick = () => {
    navigate("/profile-config");
  };

  const handleViewListUsers = () => {
    navigate("/users");
  };

  const handleViewTrainerProfile = () => {
    navigate(`/trainer/${user?.trainerId}`);
  };

  const handleViewMyAthletes = () => {
    navigate("/my-athletes");
  };

  const handleStravaConnect = () => {
    const clientId = "127528";
    const redirectUri =
      "https://salmon-pond-078c09810.5.azurestaticapps.net/strava-callback";
    const responseType = "code";
    const scope = "read,activity:read_all";
    const approvalPrompt = "auto";

    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&approval_prompt=${approvalPrompt}&scope=${scope}`;
    window.location.href = stravaAuthUrl;
  };

  return (
    <>
      {user && (
        <Container sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{ width: 64, height: 64, mr: 2, bgcolor: "primary.main" }}
                >
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h4" component="h1">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleSettingsClick} color="primary">
                  <SettingsIcon />
                </IconButton>
                {!user.stravaRunStats && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleStravaConnect}
                    sx={{ ml: 2 }}
                  >
                    Connect to Strava
                  </Button>
                )}
              </Box>
            </Box>
            <Box mb={3}>
              <Typography variant="body1">
                <strong>Username:</strong> {user.userName || "Not specified"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phone || "Not specified"}
              </Typography>
            </Box>
            {user.role === "ROLE_USER" && (
              <Box mb={3} textAlign="center">
                {user.trainerId ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewTrainerProfile}
                    sx={{ mx: 1 }}
                  >
                    View Trainer Profile
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewListUsers}
                    sx={{ mx: 1 }}
                  >
                    View Trainers
                  </Button>
                )}
              </Box>
            )}
            {user.role === "ROLE_TRAINER" && (
              <Box mb={3} display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewListUsers}
                  sx={{ mx: 1 }}
                >
                  View All Athletes
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleViewMyAthletes}
                  sx={{ mx: 1 }}
                >
                  View My Athletes
                </Button>
              </Box>
            )}
            <Box mb={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Social media</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {user.socialMediaLinks &&
                    user.socialMediaLinks.length > 0 ? (
                      user.socialMediaLinks.map((link) => (
                        <ListItem key={link.id}>
                          <ListItemText
                            primary={link.title}
                            secondary={
                              <MuiLink
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.link}
                              </MuiLink>
                            }
                          />
                        </ListItem>
                      ))
                    ) : (
                      <Typography>There are no social media</Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box mb={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Goals</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: user.goalDescription
                        ? user.goalDescription
                        : "Data not provided",
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box mb={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Experience</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: user.experienceDescription
                        ? user.experienceDescription
                        : "Data not provided",
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box mb={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Injuries</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: user.injuryDescription
                        ? user.injuryDescription
                        : "Data not provided",
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </Box>
            {user.stravaRunStats && (
              <Box mb={3}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Strava Running Stats</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      <strong>Total Run Distance:</strong>{" "}
                      {user.stravaRunStats.totalRunDistance} meters
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Run Time:</strong>{" "}
                      {user.stravaRunStats.totalRunTime} seconds
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Runs:</strong>{" "}
                      {user.stravaRunStats.totalRuns}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Max Run Distance:</strong>{" "}
                      {user.stravaRunStats.maxRunDistance} meters
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
            {!user.stravaRunStats && (
              <Box mb={3} textAlign="center">
                <Typography variant="body1" color="textSecondary">
                  Strava data is not available. Please connect to Strava to see
                  your running stats.
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UserProfilePage;
