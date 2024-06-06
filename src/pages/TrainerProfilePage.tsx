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
  ITrainerProfile,
  fetchTrainerProfile,
  sendAddAthleteRequest,
  sendRemoveTrainerRequest,
} from "../api/TrainerApi";
import { useAuth } from "../utils/AuthContext";

const TrainerProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<ITrainerProfile>();
  const [loading, setLoading] = useState(true);
  const [isAthlete, setIsAthlete] = useState(false);

  useEffect(() => {
    const loadTrainerProfile = async () => {
      const data = await fetchTrainerProfile(id);
      if (data) {
        const result = data?.id === user?.trainerId;
        setIsAthlete(result);
        setTrainer(data);
        setLoading(false);
      }
    };

    loadTrainerProfile();
  }, []);

  const handleRemoveTrainer = async () => {
    await sendRemoveTrainerRequest("remove-trainer", user?.id, trainer?.id);
    navigate("/");
  };

  const handleRequestToJoin = async () => {
    await sendAddAthleteRequest("TO_BE_ATHLETE", user?.id, trainer?.id);
    navigate("/");
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

  if (!trainer) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Trainer not found
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
              {trainer.firstName.charAt(0)}
              {trainer.lastName.charAt(0)}
            </Avatar>
            <Typography variant="h4" component="h1">
              {trainer.firstName} {trainer.lastName}
            </Typography>
          </Box>
          <Box>
            {isAthlete ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveTrainer}
              >
                Remove Trainer
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
            <strong>Username:</strong> {trainer.userName || "Not specified"}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {trainer.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {trainer.phone || "Not specified"}
          </Typography>
        </Box>
        <Box mb={3}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Social media</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {trainer.socialMediaLinks &&
                trainer.socialMediaLinks.length > 0 ? (
                  trainer.socialMediaLinks.map((link) => (
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
                  __html: trainer.goalDescription
                    ? trainer.goalDescription
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
                  __html: trainer.experienceDescription
                    ? trainer.experienceDescription
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
                  __html: trainer.injuryDescription
                    ? trainer.injuryDescription
                    : "Data not provided",
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
        {trainer.stravaRunStats && (
          <Box mb={3}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Strava Running Stats</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Total Run Distance:</strong>{" "}
                  {trainer.stravaRunStats.totalRunDistance} meters
                </Typography>
                <Typography variant="body1">
                  <strong>Total Run Time:</strong>{" "}
                  {trainer.stravaRunStats.totalRunTime} seconds
                </Typography>
                <Typography variant="body1">
                  <strong>Total Runs:</strong>{" "}
                  {trainer.stravaRunStats.totalRuns}
                </Typography>
                <Typography variant="body1">
                  <strong>Max Run Distance:</strong>{" "}
                  {trainer.stravaRunStats.maxRunDistance} meters
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
        {!trainer.stravaRunStats && (
          <Box mb={3} textAlign="center">
            <Typography variant="body1" color="textSecondary">
              Strava data is not available. Please connect to Strava to see your
              running stats.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TrainerProfilePage;
