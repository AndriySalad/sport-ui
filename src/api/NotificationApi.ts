import axiosInstance from "../utils/Api";
import { IUserProfileDate } from "../utils/UserUtils";

export interface INotification {
  id: number;
  title: string;
  description: string;
  type: string;
  viewed: boolean;
  date: string;
  receiver: IUserProfileDate;
  sender: IUserProfileDate;
}

export const fetchNotifications = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/notifications");
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications", error);
    return [];
  }
};

export const fetchNotificationHistory = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/notifications/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notification history", error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: number) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/notifications/${notificationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read", error);
  }
};

export const markAllNotificationsAsRead = async (userId?: number) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/notifications/all/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error marking all notifications as read", error);
  }
};

export const handleRequestResponse = async (
  notificationId: number,
  response: string
) => {
  try {
    const res = await axiosInstance.post(
      `/api/v1/notifications/${notificationId}/response`,
      { response }
    );
    return res.data;
  } catch (error) {
    console.error(`Error handling notification response: ${response}`, error);
  }
};
