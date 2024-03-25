import './global.css';

export { default as tailwindConfig } from './tailwind.config';
export { default as TRIApp, type TRIAppConfig, useTRIAppContext } from './tri-app';
export { Highlight, Highlighter } from './components/Highlighter';
export { useUserAuth } from './amplify/use-user-auth';
