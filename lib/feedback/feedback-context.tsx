import { createContext } from 'react';

export type ShowDialogFn = () => void;

export interface FeedbackContextProps {
  showDialog: ShowDialogFn | null;
}

export const FeedbackContext = createContext({} as FeedbackContextProps);
