export type verify = {
  message: string;
  statusCode: number;
};
export type login = {
  message: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
};
