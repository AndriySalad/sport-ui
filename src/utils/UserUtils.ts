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
  stravaRunStats?: IStravaRunStats;
}

export interface ISocialMediaLinks {
  id: number;
  title: string;
  link: string;
}

export interface IStravaRunStats {
  totalRunDistance: number;
  totalRunTime: number;
  totalRuns: number;
  maxRunDistance: number;
}
