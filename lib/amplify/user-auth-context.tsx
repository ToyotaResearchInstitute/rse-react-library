import { createContext } from 'react';

type UserAuthProps = {
  token: string;
  accessToken: string;
  userEmail: string;
  authStatus: string;
  signOut: () => void;
  signInWithRedirect: () => void;
};

export const UserAuthContext = createContext({} as UserAuthProps);
