import React from "react";
import { Box, Typography, TextField, Button, Modal } from "@mui/material";

interface LinkModalProps {
  open: boolean;
  handleClose: () => void;
  isEditing: boolean;
  linkData: { title: string; link: string };
  handleLinkChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleLinkSubmit: (e: React.FormEvent) => void;
}

const LinkModal: React.FC<LinkModalProps> = ({
  open,
  handleClose,
  isEditing,
  linkData,
  handleLinkChange,
  handleLinkSubmit,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: "90%",
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
        >
          {isEditing ? "Edit a link" : "Add a link"}
        </Typography>
        <Box component="form" onSubmit={handleLinkSubmit}>
          <TextField
            label="Link title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={linkData.title}
            onChange={handleLinkChange}
          />
          <TextField
            label="Link"
            variant="outlined"
            fullWidth
            margin="normal"
            name="link"
            value={linkData.link}
            onChange={handleLinkChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LinkModal;
