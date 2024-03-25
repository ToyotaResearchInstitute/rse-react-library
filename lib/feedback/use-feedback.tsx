import { useContext } from 'react';
import { FeedbackContext } from './feedback-context';

function useFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}

export { useFeedback };
