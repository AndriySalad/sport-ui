import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ISocialMediaLinks } from "../../utils/UserUtils";

interface SocialMediaSettingsProps {
  socialMediaLinks?: ISocialMediaLinks[];
  handleEditModalOpen: (linkId: number) => void;
  handleDeleteLink: (linkId: number) => void;
}

const SocialMediaSettings: React.FC<SocialMediaSettingsProps> = ({
  socialMediaLinks,
  handleEditModalOpen,
  handleDeleteLink,
}) => {
  return (
    <Grid container spacing={2}>
      {socialMediaLinks?.map((link) => (
        <Grid item xs={12} sm={6} key={link.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {link.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {link.link}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditModalOpen(link.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteLink(link.id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SocialMediaSettings;
