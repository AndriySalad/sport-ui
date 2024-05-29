import axiosInstance from "../utils/Api";

export interface Training {
  id: number;
  title: string;
  description: string;
  date: string;
  exercises: IExercise[] | [];
  creatorId: number;
}

export interface IExercise {
  id: number;
  title: string;
  trainingId: number;
  description: string;
  type: string;
  measurement: string;
  sets: number;
  repetitions: number;
  completed: boolean;
}

export interface IFetchTrainingsProps {
  startDate: string;
  endDate: string;
}

export interface IFetchAthleteTrainingsProps {
  athleteId?: string;
  startDate: string;
  endDate: string;
}

export interface ICreateTraining {
  title: string;
  description: string;
  date: string;
  creatorId?: number;
}

export const fetchAthleteTrainings = async ({
  athleteId,
  startDate,
  endDate,
}: IFetchAthleteTrainingsProps) => {
  try {
    const response = await axiosInstance.get<Training[]>(
      `/api/v1/trainings/by-athlete/${athleteId}/between/${startDate}/and/${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
};

export const fetchMyTrainings = async ({
  startDate,
  endDate,
}: IFetchTrainingsProps) => {
  try {
    const response = await axiosInstance.get<Training[]>(
      `/api/v1/user-profile/between/${startDate}/and/${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
};

export const createNewTraining = async (
  newTraining: ICreateTraining,
  athleteId?: number
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/trainings/${athleteId}`,
      newTraining
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
};

export const createNewExercise = async (
  trainingId: number,
  newExercise: IExercise
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/trainings/${trainingId}/exercises`,
      newExercise
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
};

export const updateExerciseStatus = async (
  exerciseId: number,
  trainingId: number
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/trainings/is-done/${trainingId}/${exerciseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainings:", error);
    return [];
  }
};
