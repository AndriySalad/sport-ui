import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import {
  IExercise,
  Training,
  createNewExercise,
  createNewTraining,
  fetchAthleteTrainings,
} from "../api/TrainingApi";
import { useAuth } from "../utils/AuthContext";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NewTrainingModal from "../components/trainings/NewTrainingModal";
import NewExerciseModal from "../components/trainings/NewExerciseModal";
import { useParams } from "react-router-dom";

const TrainingPageForTrainer: React.FC = () => {
  const { user } = useAuth();
  const trainerId = user?.id;
  const { athleteId } = useParams();

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [openModal, setOpenModal] = useState(false);
  const [newTraining, setNewTraining] = useState({
    date: "",
    title: "",
    description: "",
  });
  const [newExercise, setNewExercise] = useState<IExercise>({
    id: 0,
    trainingId: 0,
    title: "",
    description: "",
    type: "RUNNING",
    measurement: "",
    sets: 0,
    repetitions: 0,
    completed: false,
  });
  const [openExerciseModal, setOpenExerciseModal] = useState(false);

  useEffect(() => {
    fetchTrainings();
  }, [currentDate]);

  const handleAddTraining = async () => {
    try {
      if (athleteId) {
        await createNewTraining(
          { ...newTraining, creatorId: trainerId },
          +athleteId
        );
      }
      setOpenModal(false);
      fetchTrainings();
    } catch (error) {
      console.error("Error adding training", error);
    }
  };

  const handleAddExercise = async () => {
    try {
      await createNewExercise(newExercise.trainingId, {
        ...newExercise,
      });
      setOpenExerciseModal(false);
      fetchTrainings();
    } catch (error) {
      console.error("Error adding exercise", error);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month");
  const today = dayjs();

  const fetchTrainings = async () => {
    try {
      const startDate = currentDate.startOf("month").format("YYYY-MM-DD");
      const endDate = currentDate.endOf("month").format("YYYY-MM-DD");
      console.log("Fetching trainings", startDate, endDate);
      const data = await fetchAthleteTrainings({
        athleteId,
        startDate,
        endDate,
      });
      if (data) {
        setTrainings(data);
      } else {
        setTrainings([]);
      }
    } catch (error) {
      console.error("Error fetching trainings", error);
      setTrainings([]);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <IconButton onClick={handlePreviousMonth}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" align="center" gutterBottom>
          Trainings for {currentDate.format("MMMM YYYY")}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {[...Array(daysInMonth)].map((_, index) => {
          const day = startOfMonth.add(index, "day");
          const dayTrainings = trainings
            ? trainings.filter((t) => dayjs(t.date).isSame(day, "day"))
            : [];
          const isPastDay = day.isBefore(today, "day");
          const isFutureDay = day.isAfter(today, "day");

          return (
            <Grid item xs={12} key={index}>
              <Box
                bgcolor={day.isSame(today, "day") ? "lightblue" : "white"}
                p={2}
                borderRadius={4}
                boxShadow={3}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    {day.format("DD MMMM YYYY")}
                  </Typography>
                  {!isPastDay && (
                    <IconButton
                      onClick={() => {
                        setNewTraining({
                          date: day.format("YYYY-MM-DD"),
                          title: "",
                          description: "",
                        });
                        setOpenModal(true);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>
                {dayTrainings.length > 0 ? (
                  dayTrainings.map((training, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{training.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{training.description}</Typography>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mt={2}
                        >
                          <Typography variant="subtitle1">Exercises</Typography>
                          {trainerId === training.creatorId && (
                            <IconButton
                              onClick={() => {
                                setNewExercise({
                                  id: 0,
                                  trainingId: training.id,
                                  title: "",
                                  description: "",
                                  type: "RUNNING",
                                  measurement: "",
                                  sets: 0,
                                  repetitions: 0,
                                  completed: false,
                                });
                                setOpenExerciseModal(true);
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          )}
                        </Box>
                        <List>
                          {training.exercises.map((exercise) => (
                            <React.Fragment key={exercise.id}>
                              <ListItem>
                                <ListItemIcon>
                                  {exercise.type === "RUNNING" ? (
                                    <DirectionsRunIcon />
                                  ) : (
                                    <FitnessCenterIcon />
                                  )}
                                </ListItemIcon>
                                {!isFutureDay ? (
                                  <Tooltip
                                    title={
                                      "You are trainer for this athlete, you cant mark this exercise as completed!"
                                    }
                                  >
                                    <Checkbox checked={exercise.completed} />
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    title={
                                      "You cannot perform an exercise that is intended for an upcoming training session"
                                    }
                                  >
                                    <Checkbox checked={exercise.completed} />
                                  </Tooltip>
                                )}
                                <ListItemText
                                  primary={
                                    <Typography variant="subtitle1">
                                      {exercise.title}
                                    </Typography>
                                  }
                                  secondary={
                                    <>
                                      <Typography variant="body2">
                                        {exercise.description}
                                      </Typography>
                                      <Typography variant="body2">
                                        Measurement:{" "}
                                        <strong>{exercise.measurement}</strong>{" "}
                                        | Sets count:{" "}
                                        <strong>{exercise.sets}</strong> | Reps
                                        per set:{" "}
                                        <strong>{exercise.repetitions}</strong>
                                      </Typography>
                                    </>
                                  }
                                />
                              </ListItem>
                              <Divider component="li" />
                            </React.Fragment>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : (
                  <Typography>No trainings for this day</Typography>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <NewTrainingModal
        openModal={openModal}
        handleAddTraining={handleAddTraining}
        newTraining={newTraining}
        setNewTraining={setNewTraining}
        setOpenModal={setOpenModal}
      />

      <NewExerciseModal
        openExerciseModal={openExerciseModal}
        handleAddExercise={handleAddExercise}
        newExercise={newExercise}
        setNewExercise={setNewExercise}
        setOpenExerciseModal={setOpenExerciseModal}
      />
    </Container>
  );
};

export default TrainingPageForTrainer;
