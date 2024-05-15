// FeedbackButton.tsx

import { Button } from '@material-tailwind/react';
// import { useFeedback } from '../feedback/use-feedback';

const FeedbackButton = () => {
  // const { showDialog } = useFeedback();

  return (
    window.showCollectorDialog && (
      <div className="absolute right-0 top-[50%] origin-top-right rotate-90">
        <Button
          variant="filled"
          size="lg"
          placeholder="Feedback"
          className="!rounded-b-sm !rounded-t-none px-4 py-3 !font-medium text-base normal-case"
          onClick={window.showCollectorDialog}
        >
          Feedback
        </Button>
      </div>
    )
  );
};

export { FeedbackButton };
export default FeedbackButton;
