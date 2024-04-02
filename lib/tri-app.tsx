import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {} from 'aws-amplify';
import { type ReactElement, createContext, useContext } from 'react';
import FeedbackProvider from './feedback/FeedbackProvider';
import CognitoProvider from './amplify/cognito-provider';
import AppLayout from './layout/AppLayout';

const queryClient = new QueryClient();

export type TRIAppConfig = {
  name: string;
  AWSConfig: unknown;
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
      <QueryClientProvider client={queryClient}>
        <FeedbackProvider>
          <CognitoProvider>
            <AppLayout />
          </CognitoProvider>
        </FeedbackProvider>
      </QueryClientProvider>
    </TRIAppContext.Provider>
  );
};

export default TRIApp;