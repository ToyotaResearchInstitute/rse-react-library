import { useTRIAppContext } from '../tri-app';
import { useUserAuth } from '../amplify/use-user-auth';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  const { amplifyEnabled } = useTRIAppContext();
  const { token } = useUserAuth();

  return (
    <footer className="tri-flex tri-items-center tri-gap-6 tri-bg-gray-900 tri-px-6 tri-py-10 tri-text-white">
      <nav className="tri-flex tri-items-center tri-justify-end tri-gap-6">
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
      <span className="tri-flex tri-grow tri-justify-end">© Copyright Toyota Research Institute {year}</span>
    </footer>
  );
};

export default Footer;
