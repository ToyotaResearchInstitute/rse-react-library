import { createContext } from 'react';

type UserAuthProps = {
  token: string;
  userEmail: string;
  signOut: () => void;
  signIn: () => void;
};

export const UserAuthContext = createContext({} as UserAuthProps);
