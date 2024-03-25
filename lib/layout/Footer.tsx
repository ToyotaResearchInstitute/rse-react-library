import { useTRIAppContext } from '../tri-app';
import { useUserAuth } from '../amplify/use-user-auth';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const { amplifyEnabled } = useTRIAppContext();
  const { token } = useUserAuth();

  return (
    <footer className="flex items-center gap-6 bg-gray-900 px-6 py-10 text-white">
      <nav className="flex items-center justify-end gap-6">
        {(!amplifyEnabled || token) && (
          <>
            <Link to="/about">About</Link>
            <Link to="/about#code">Code</Link>
            <Link to="/about#manuscript">Manuscript</Link>
            <a
              href="https://www.tri.global/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </>
        )}
      </nav>
      <span className="flex grow justify-end">© Copyright Toyota Research Institute {year}</span>
    </footer>
  );
};

export default Footer;
