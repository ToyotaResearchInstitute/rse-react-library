import { useUserAuth } from '../amplify/use-user-auth';

import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react/components/Button';
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
    <header className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-white">
      <img
        src={logo}
        alt="Logo"
        width={'150px'}
      />
      <h3>{!amplifyEnabled || token ? name : ''}</h3>
      <nav className="flex grow items-center justify-end gap-6">
        {(!amplifyEnabled || token) && <Link to="/about">About</Link>}
        {amplifyEnabled && (
          <>
            <Button
              variant="filled"
              placeholder="Sign Out"
              className="bg-white text-black"
              onClick={handleClick}
            >
              {token ? 'Sign Out' : 'Sign In'}
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
