import { Button } from "../components/ui/button";

const FeedbackButton = () => {
  return (
    window.showCollectorDialog && (
      <div className="tri-absolute tri-right-0 tri-top-[50%] tri-origin-top-right tri-rotate-90">
        <Button
          variant="default"
          className="tri-rounded-none tri-rounded-b-sm tri-px-4 tri-py-3 tri-text-base tri-font-medium tri-normal-case"
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
