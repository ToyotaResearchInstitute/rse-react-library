import { type ReactElement, createContext, useContext } from 'react';
// import FeedbackProvider from './feedback/FeedbackProvider';
import CognitoProvider from './amplify/cognito-provider';
import AppLayout from './layout/AppLayout';
import { ScrollRestoration } from 'react-router-dom';

export type TRIAppConfig = {
  name: string;
  AWSConfig: {
    Auth: {
      Cognito: {
        region: string;
        userPoolId: string;
        userPoolClientId: string;
        mandatorySignIn: boolean;
      };
    };
  };
  issueCollectorUrl?: string;
  apiBaseUrl: string;
  amplifyEnabled: boolean;
};

type TRIAppContext = TRIAppConfig & {
  PreloginPage?: ReactElement;
};

const TRIAppContext = createContext<TRIAppContext | null>(null);

export function useTRIAppContext() {
  const context = useContext(TRIAppContext);
  if (context === undefined) {
    throw new Error('useTRIAppContext must be used within a TRIApp');
  }
  return context as TRIAppContext;
}
interface TRIAppProps {
  config: TRIAppConfig;
  PreloginPage?: ReactElement;
}

const TRIApp = ({ config, PreloginPage }: TRIAppProps) => {
  return (
    <TRIAppContext.Provider value={{ ...config, PreloginPage }}>
      <CognitoProvider config={config.AWSConfig}>
        <ScrollRestoration />
        <AppLayout />
      </CognitoProvider>
    </TRIAppContext.Provider>
  );
};

export default TRIApp;
