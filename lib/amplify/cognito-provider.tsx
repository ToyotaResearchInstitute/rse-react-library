import { Authenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession, type JWT } from 'aws-amplify/auth';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { UserAuthContext } from './user-auth-context';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

interface Props {
  children?: ReactNode;
  config: {
    Auth: {
      Cognito: {
        region: string;
        userPoolId: string;
        userPoolClientId: string;
        mandatorySignIn: boolean;
      };
    };
  };
}

export default function CognitoProvider({ children, config }: Props) {
  Amplify.configure(config);

  return (
    <Authenticator.Provider>
      <TokenProvider>{children}</TokenProvider>
    </Authenticator.Provider>
  );
}

function getTokenEmail(idToken: JWT | undefined): string {
  if (idToken) {
    if (idToken.payload) {
      if (idToken.payload['email']) {
        return idToken.payload['email'].toString();
      }
    }
  }
  return '';
}

interface TokenProps {
  children?: ReactNode;
}

export function TokenProvider({ children }: TokenProps) {
  const [token, setToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userEmail, setUserEmail] = useState('debug@gmail.com');
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    currentSession();
  }, []);

  const currentSession = async (): Promise<void> => {
    try {
      // const { idToken, accessToken: accToken } = (await fetchAuthSession()).tokens ?? {};
      const tokens = (await fetchAuthSession()).tokens;
      if (!tokens) {
        return;
      }

      const { idToken, accessToken: accToken } = tokens;
      const jwtToken = idToken?.toString() ?? '';
      const accessToken = accToken?.toString() ?? '';
      const email = getTokenEmail(idToken);
      setToken(jwtToken);
      setAccessToken(accessToken);
      setUserEmail(email);
    } catch (err) {
      console.log(err);
    }
  };

  const value = useMemo(
    () => ({
      authStatus,
      token,
      accessToken,
      userEmail,
      signInWithRedirect,
      signOut,
    }),
    [token, accessToken, userEmail, authStatus],
  );

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}
