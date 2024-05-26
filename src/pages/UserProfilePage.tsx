import {
  Container,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { EDIT_PROFILE_ROUTE } from "../Routes";

const UserProfilePage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate(EDIT_PROFILE_ROUTE);
  };

  return (
    <>
      {user && (
        <Container sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box display="flex" alignItems="center">
                <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h4">
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
              <IconButton onClick={handleSettingsClick}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <Box>
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
            <Box mt={3}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Social media</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {user &&
                    user.socialMediaLinks &&
                    user.socialMediaLinks.length > 0 ? (
                      user.socialMediaLinks.map((link) => (
                        <ListItem key={link.id}>
                          <ListItemText
                            primary={link.title}
                            secondary={
                              <Link
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.link}
                              </Link>
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
            <Box mt={3}>
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
            <Box mt={3}>
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
            <Box mt={3}>
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
          </Paper>
        </Container>
      )}
    </>
  );
};

export default UserProfilePage;
