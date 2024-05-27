export interface IUserProfileDate {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  role: string;
  socialMediaLinks: ISocialMediaLinks[];
  goalDescription: string;
  experienceDescription: string;
  injuryDescription: string;
  trainerId: number;
  notificationCount: number;
}

export interface ISocialMediaLinks {
  id: number;
  title: string;
  link: string;
}
