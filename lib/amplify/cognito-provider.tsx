import { Amplify, Auth, Hub } from 'aws-amplify';
import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { UserAuthContext } from './user-auth-context';
import { useTRIAppContext } from '../tri-app';

interface Props {
  children?: ReactNode;
}

export default function CognitoProvider({ children }: Props) {
  const { AWSConfig } = useTRIAppContext();
  const [token, setToken] = useState('');
  const [userEmail, setUserEmail] = useState('debug@gmail.com');
  const signOut = useCallback(() => {
    Auth.signOut().catch((error) => console.log(error));
  }, []);
  const signIn = useCallback(() => {
    Auth.federatedSignIn().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    Amplify.configure(AWSConfig);

    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          setToken(data.signInUserSession.idToken.jwtToken);
          setUserEmail(data.signInUserSession.idToken.payload.email);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Error', data);
          break;
      }
    });

    // fetch the jwt token for use of api calls later
    Auth.currentAuthenticatedUser()
      .then((currentUser) => {
        setToken(currentUser.signInUserSession.idToken.jwtToken);
        setUserEmail(currentUser.signInUserSession.idToken.payload.email);
      })
      .catch(() => console.log('Not signed in'));

    return unsubscribe;
  }, [AWSConfig]);

  const value = useMemo(
    () => ({
      token,
      userEmail,
      signOut,
      signIn,
    }),
    [token, userEmail, signOut, signIn],
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}
