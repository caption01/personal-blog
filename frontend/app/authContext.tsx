'use client';

import { createContext, ReactNode, useState } from 'react';

interface AuthContextInterface {
  isAdmin: boolean;
  username: string | null;
  token: string | null;
  login: (info: UserDto) => void;
}

interface UserInfo {
  username: string | null;
  isAdmin: boolean;
  token: string | null;
}

interface UserDto {
  username: string | null;
  is_admin: boolean;
  token: string | null;
}

export const AuthContext = createContext<AuthContextInterface>({
  isAdmin: false,
  username: null,
  token: null,
  login: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfo>(() => ({
    isAdmin: false,
    username: null,
    token: null,
  }));

  const login = (userInfo: UserDto): void => {
    setUser({
      isAdmin: userInfo.is_admin,
      username: userInfo.username,
      token: userInfo.token,
    });
  };

  const value = { ...user, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
