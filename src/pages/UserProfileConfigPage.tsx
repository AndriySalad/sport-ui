import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tab,
  Tabs,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../utils/AuthContext";
import ProfileSettings from "../components/profile-settings/ProfileSettings";
import LinkModal from "../components/profile-settings/LinkModal";
import SocialMediaSettings from "../components/profile-settings/SocialMediaSettings";
import axiosInstance from "../utils/Api";
import { ISocialMediaLinks } from "../utils/UserUtils";

const EditUserProfilePage: React.FC = () => {
  const { user, setUserProfileData } = useAuth();

  const [tabIndex, setTabIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLinkId, setCurrentLinkId] = useState<number | null>(null);
  const [linkData, setLinkData] = useState({ title: "", link: "" });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleModalOpen = () => {
    setIsEditing(false);
    setLinkData({ title: "", link: "" });
    setOpenModal(true);
  };

  const handleEditModalOpen = (linkId: number) => {
    const link = user?.socialMediaLinks?.find((link) => link.id === linkId);
    if (link) {
      setLinkData({ title: link.title, link: link.link });
      setCurrentLinkId(linkId);
      setIsEditing(true);
      setOpenModal(true);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLinkData({
      ...linkData,
      [name]: value,
    });
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentLinkId !== null) {
        const response = await axiosInstance.put(
          `/api/v1/social-media-links/${currentLinkId}`,
          linkData
        );

        if (response.data) {
          if (user) {
            const updatedLinks: ISocialMediaLinks[] =
              user.socialMediaLinks.filter((link) => link.id !== currentLinkId);
            setUserProfileData(
              user && user.socialMediaLinks
                ? {
                    ...user,
                    socialMediaLinks: [...updatedLinks, response.data],
                  }
                : user
            );
          }
        }
      } else {
        const response = await axiosInstance.post(
          "/api/v1/social-media-links",
          linkData
        );

        if (response.data) {
          setUserProfileData(
            user && user.socialMediaLinks
              ? {
                  ...user,
                  socialMediaLinks: [...user.socialMediaLinks, response.data],
                }
              : user
          );
        }
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  const handleDeleteLink = async (linkId: number) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/social-media-links/${linkId}`
      );

      if (response) {
        if (user) {
          const updatedLinks: ISocialMediaLinks[] =
            user.socialMediaLinks.filter((link) => link.id !== linkId);
          setUserProfileData(
            user && user.socialMediaLinks
              ? {
                  ...user,
                  socialMediaLinks: updatedLinks,
                }
              : user
          );
        }
      }
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" mb={4} align="center">
          Edit your profile
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Profile settings" />
          <Tab label="Social media" />
        </Tabs>
        <Box>
          {tabIndex === 0 && <ProfileSettings user={user} />}
          {tabIndex === 1 && (
            <SocialMediaSettings
              socialMediaLinks={user?.socialMediaLinks}
              handleEditModalOpen={handleEditModalOpen}
              handleDeleteLink={handleDeleteLink}
            />
          )}
        </Box>
        {tabIndex === 1 && (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <IconButton aria-label="add" onClick={handleModalOpen}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Paper>
      <LinkModal
        open={openModal}
        handleClose={handleModalClose}
        isEditing={isEditing}
        linkData={linkData}
        handleLinkChange={handleLinkChange}
        handleLinkSubmit={handleLinkSubmit}
      />
    </Container>
  );
};

export default EditUserProfilePage;
