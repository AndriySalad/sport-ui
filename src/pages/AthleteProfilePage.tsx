import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  CircularProgress,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams, useNavigate } from "react-router-dom";
import {
  IAthleteProfile,
  fetchAthleteProfile,
  sendAddAthleteRequest,
  sendRemoveTrainerRequest,
} from "../api/TrainerApi";
import { useAuth } from "../utils/AuthContext";
import { HOME_ROUTE } from "../Routes";

const AthleteProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [athlete, setTrainer] = useState<IAthleteProfile>();
  const [loading, setLoading] = useState(true);
  const [isTrainer, setIsTrainer] = useState(false);

  useEffect(() => {
    const loadTrainerProfile = async () => {
      const data = await fetchAthleteProfile(id);
      if (data) {
        const result = data?.trainerId === user?.id;
        setIsTrainer(result);
        setTrainer(data);
        setLoading(false);
      }
    };

    loadTrainerProfile();
  }, [user]);

  const handleRemoveTrainer = async () => {
    await sendRemoveTrainerRequest("remove-trainer", athlete?.id, user?.id);
    navigate(HOME_ROUTE);
  };

  const handleRequestToJoin = async () => {
    await sendAddAthleteRequest("TO_BE_ATHLETE", athlete?.id, user?.id);
    navigate(HOME_ROUTE);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!athlete) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Athlete not found
        </Typography>
      </Container>
    );
  }

  return (
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
              {athlete.firstName.charAt(0)}
              {athlete.lastName.charAt(0)}
            </Avatar>
            <Typography variant="h4" component="h1">
              {athlete.firstName} {athlete.lastName}
            </Typography>
          </Box>
          <Box>
            {isTrainer ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveTrainer}
              >
                Remove Athlete
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRequestToJoin}
              >
                Request to Join
              </Button>
            )}
          </Box>
        </Box>
        <Box mb={3}>
          <Typography variant="body1">
            <strong>Username:</strong> {athlete.userName || "Not specified"}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {athlete.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {athlete.phone || "Not specified"}
          </Typography>
        </Box>
        <Box mb={3}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Social media</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {athlete.socialMediaLinks &&
                athlete.socialMediaLinks.length > 0 ? (
                  athlete.socialMediaLinks.map((link) => (
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
                  __html: athlete.goalDescription
                    ? athlete.goalDescription
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
                  __html: athlete.experienceDescription
                    ? athlete.experienceDescription
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
                  __html: athlete.injuryDescription
                    ? athlete.injuryDescription
                    : "Data not provided",
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </Container>
  );
};

export default AthleteProfilePage;
