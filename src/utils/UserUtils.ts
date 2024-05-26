export interface IUserProfileDate {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  socialMediaLinks: ISocialMediaLinks[];
  goalDescription: string;
  experienceDescription: string;
  injuryDescription: string;
}

export interface ISocialMediaLinks {
  id: number;
  title: string;
  link: string;
}
