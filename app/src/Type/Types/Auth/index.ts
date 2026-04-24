type AuthUserInfo = {
  _id?: string;
  FirstName: string;
  LastName: string;
  email: string;
  view?: number;
  createdAt?: string;
  updatedAt?: string;
};

type AuthSlice = {
  userInfo: AuthUserInfo | undefined;
  setUserInfo: (userInfo: AuthUserInfo | undefined) => void;
};

export type { AuthUserInfo, AuthSlice };