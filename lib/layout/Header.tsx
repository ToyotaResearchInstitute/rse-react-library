import { useUserAuth } from '../amplify/use-user-auth';

import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { signInWithRedirect, signOut } from 'aws-amplify/auth';

import logo from '../images/blackimage.png';

import { useTRIAppContext } from '../tri-app';

export default function Header() {
  const { name, amplifyEnabled } = useTRIAppContext();
  const { token } = useUserAuth();

  const handleClick = () => {
    if (token) 
      signOut()
    else
      signInWithRedirect();
  };


  return (
    <header className="tri-flex tri-items-center tri-gap-6 tri-bg-gray-900 tri-px-6 tri-py-4 tri-text-white">
      <img
        src={logo}
        alt="Logo"
        width={'150px'}
      />
      <h3>{!amplifyEnabled || token ? name : ''}</h3>
      <nav className="tri-flex tri-grow tri-items-center tri-justify-end tri-gap-6">
        {(!amplifyEnabled || token) && <Link to="/about">About</Link>}
        {amplifyEnabled && (
          <>
            <Button
              onClick={handleClick}
              className="tri-bg-white tri-text-black hover:tri-bg-gray-100"
            >
              {token ? "Sign Out" : "Sign In"}
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
