import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IExercise } from "../../api/TrainingApi";

export interface NewExerciseModalProps {
  openExerciseModal: boolean;
  setOpenExerciseModal: (open: boolean) => void;
  newExercise: IExercise;
  setNewExercise: (newExercise: IExercise) => void;
  handleAddExercise: () => void;
}

const NewExerciseModal = ({
  openExerciseModal,
  setOpenExerciseModal,
  newExercise,
  setNewExercise,
  handleAddExercise,
}: NewExerciseModalProps) => {
  return (
    <Modal open={openExerciseModal} onClose={() => setOpenExerciseModal(false)}>
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
          Add Exercise
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={newExercise?.title}
          onChange={(e) =>
            setNewExercise({ ...newExercise, title: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={newExercise?.description}
          onChange={(e) =>
            setNewExercise({ ...newExercise, description: e.target.value })
          }
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            value={newExercise.type}
            onChange={(e) =>
              setNewExercise({ ...newExercise, type: e.target.value })
            }
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="STRENGTH">Strength</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label={
            newExercise.type === "RUNNING" ? "Distance (meters)" : "Repetitions"
          }
          value={newExercise.measurement}
          onChange={(e) =>
            setNewExercise({ ...newExercise, measurement: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Sets"
          value={newExercise.sets}
          onChange={(e) =>
            setNewExercise({ ...newExercise, sets: +e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Reps per set"
          value={newExercise.repetitions}
          onChange={(e) =>
            setNewExercise({ ...newExercise, repetitions: +e.target.value })
          }
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExercise}
          >
            Add
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenExerciseModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewExerciseModal;
