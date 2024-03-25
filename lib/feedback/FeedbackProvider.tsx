import { useState, useEffect, useMemo, type ReactNode } from 'react';
import { FeedbackContext, type FeedbackContextProps, type ShowDialogFn } from './feedback-context';
import { useTRIAppContext } from '../tri-app';

declare global {
  // eslint-disable-next-line no-var
  var ATL_JQ_PAGE_PROPS: null | {
    triggerFunction: (fn: ShowDialogFn) => void;
  };
}

interface FeedbackProviderProps {
  children?: ReactNode;
}

const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const { issueCollectorUrl } = useTRIAppContext();
  const id = 'issueCollectorScript';
  const [showDialog, setShowDialog] = useState<ShowDialogFn | null>(null);

  useEffect(() => {
    globalThis.ATL_JQ_PAGE_PROPS = {
      triggerFunction: function (showCollectorDialog) {
        setShowDialog(() => showCollectorDialog);
      },
    };
  }, []);

  useEffect(() => {
    const oldScript = document.head.querySelector(`#${id}`);
    if (oldScript) {
      document.head.removeChild(oldScript);
    }
    const newScript: HTMLScriptElement = document.createElement('script');
    if (issueCollectorUrl) {
      newScript.src = issueCollectorUrl;
      newScript.id = id;
      document.head.appendChild(newScript);
    }
  }, [issueCollectorUrl]);

  const value = useMemo<FeedbackContextProps>(
    () => ({
      showDialog,
    }),
    [showDialog],
  );

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
};

export default FeedbackProvider;
