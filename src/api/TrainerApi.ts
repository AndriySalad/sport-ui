import axiosInstance from "../utils/Api";
import { ISocialMediaLinks } from "../utils/UserUtils";

export interface ITrainerProfile {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  goalDescription: string;
  experienceDescription: string;
  injuryDescription: string;
  role: string;
  socialMediaLinks: ISocialMediaLinks[];
}

export interface IAthleteProfile {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  goalDescription: string;
  experienceDescription: string;
  injuryDescription: string;
  role: string;
  trainerId: number;
  socialMediaLinks: ISocialMediaLinks[];
}

export interface IUserListItem {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
}

export const fetchTrainerProfile = async (trainerId?: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/athlete-trainer/trainer/${trainerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainer profile", error);
    return null;
  }
};

export const fetchAthleteProfile = async (athleteId?: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/athlete-trainer/athlete/${athleteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainer profile", error);
    return null;
  }
};

export const sendAddAthleteRequest = async (
  type: String,
  athleteId?: number,
  trainerId?: number
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/athlete-trainer/request`,
      null,
      {
        params: {
          athleteId: athleteId,
          trainerId: trainerId,
          type: type,
        },
      }
    );
  } catch (error) {
    console.error("Error sending add athlete request", error);
  }
};

export const sendRemoveTrainerRequest = async (
  type: String,
  athleteId?: number,
  trainerId?: number
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/athlete-trainer/handle-request`,
      null,
      {
        params: {
          athleteId: athleteId,
          trainerId: trainerId,
          action: type,
        },
      }
    );
  } catch (error) {
    console.error("Error sending add athlete request", error);
  }
};

export const fetchAthletes = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/athlete-trainer/athletes"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes", error);
    return [];
  }
};

export const fetchTrainers = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/athlete-trainer/trainers"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trainers", error);
    return [];
  }
};

export const fetchMyAthletes = async (trainerId?: number) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/athlete-trainer/${trainerId}/athletes`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes", error);
    return [];
  }
};
