export class User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  jwtToken: string;
}

export interface RegUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}
