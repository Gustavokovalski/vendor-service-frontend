export interface IUserModel {
  id: string;
  email: string;
  password?: string;
  profileId: number;
  token?: string;
}
