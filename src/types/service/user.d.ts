export interface IUserInfo {
  id?: number;
  is_active?: boolean;
  username?: string;
}

export type LoginParams = {
  username: string;
  password: string;
};

export type LoginResult = {
  access_token: string;
  token_type: string;
};
