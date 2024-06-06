import React from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

interface INewTrainingModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  newTraining: { title: string; description: string; date: string };
  setNewTraining: (newTraining: {
    title: string;
    description: string;
    date: string;
  }) => void;
  handleAddTraining: () => void;
}

const NewTrainingModal = ({
  openModal,
  setOpenModal,
  newTraining,
  setNewTraining,
  handleAddTraining,
}: INewTrainingModalProps) => {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        p={4}
        bgcolor="white"
        mx="auto"
        mt={10}
        width={400}
        borderRadius={4}
        boxShadow={3}
      >
        <Typography variant="h6" gutterBottom>
          Add Training
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={newTraining.title}
          onChange={(e) =>
            setNewTraining({ ...newTraining, title: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={newTraining.description}
          onChange={(e) =>
            setNewTraining({ ...newTraining, description: e.target.value })
          }
          multiline
          rows={4}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTraining}
          >
            Add
          </Button>
          <Button variant="contained" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewTrainingModal;
