import { Button } from "../components/ui/button";

const FeedbackButton = () => {
  return (
    window.showCollectorDialog && (
      <div className="absolute right-0 top-[50%] origin-top-right rotate-90">
        <Button
          variant="default"
          className="rounded-none rounded-b-sm px-4 py-3 text-base font-medium normal-case"
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
