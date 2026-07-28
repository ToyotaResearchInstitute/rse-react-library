import { Suspense } from 'react';

import Header from './Header';
import Footer from './Footer';
import FeedbackButton from './FeedbackButton';

import { useUserAuth } from '../amplify/use-user-auth';
import { useTRIAppContext } from '../tri-app';

import { Outlet } from 'react-router-dom';

import '../styles/index.css';

const AppLayout = () => {
  const { token } = useUserAuth();
  const { amplifyEnabled, PreloginPage } = useTRIAppContext();
  return (
    <div className="tri-flex tri-min-h-[100vh] tri-flex-col">
      <Header />
      <div className="tri-relative tri-flex tri-grow tri-flex-row tri-bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          {!amplifyEnabled || token ? <Outlet /> : PreloginPage}
        </Suspense>
      </div>
      <Footer />
      {!amplifyEnabled || token ? <FeedbackButton /> : null}
    </div>
  );
};

export default AppLayout;
