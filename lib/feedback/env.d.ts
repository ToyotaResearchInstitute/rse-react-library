interface Window {
  showCollectorDialog(): void;

  ATL_JQ_PAGE_PROPS: null | {
    triggerFunction: (fn: ShowDialogFn) => void;
  };
}
