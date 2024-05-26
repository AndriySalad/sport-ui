export interface IUserProfileDate {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  socialMediaLinks: ISocialMediaLinks[];
}

export interface ISocialMediaLinks {
  id: number;
  title: string;
  link: string;
}
