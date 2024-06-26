import { createContext, type ReactNode, useState, useEffect, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const defaultHighlightDuration = 1000;
const defaultTransitionDuration = 1000;
// TODO: Add props to override these defaults, if the need arises
const defaultHighlightClassName =
  'z-0 inset-[-1em] shadow-[0_0_10px_0_#757575] rounded-lg bg-white';
const defaultHighlightedClassName = 'opacity-1';
const defaultUnhighlightedClassName = 'opacity-0';
const defaultClassName = 'z1';

interface HighlighterContextProps {
  highlighted: string | null;
  transitionDuration: number;
}

const HighlighterContext = createContext<HighlighterContextProps>({
  highlighted: null,
  transitionDuration: defaultTransitionDuration,
});

interface HighlighterProps {
  children?: ReactNode;
  highlightDuration?: number;
  transitionDuration?: number;
}

export const Highlighter = ({
  children,
  highlightDuration,
  transitionDuration,
}: HighlighterProps) => {
  const { hash } = useLocation();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const timerDuration =
    (highlightDuration ?? defaultHighlightDuration) +
    (transitionDuration ?? defaultTransitionDuration);

  useEffect(() => {
    setHighlighted(hash.substring(1));

    const timeoutId = setTimeout(() => {
      setHighlighted(null);
    }, timerDuration);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [hash, timerDuration]);

  const value = useMemo<HighlighterContextProps>(
    () => ({
      highlighted,
      transitionDuration: transitionDuration ?? defaultTransitionDuration,
    }),
    [highlighted, transitionDuration],
  );

  return <HighlighterContext.Provider value={value}>{children}</HighlighterContext.Provider>;
};

interface HighlightProps {
  id: string;
  children?: ReactNode;
}

export const Highlight = ({ id, children: child }: HighlightProps) => {
  const { highlighted, transitionDuration } = useContext(HighlighterContext);

  if (!child) {
    return null;
  }

  if (Array.isArray(child)) {
    throw new Error('Highlight only accepts a single child');
  }

  const highlightClassName = `${defaultHighlightClassName} ${
    highlighted === id ? defaultHighlightedClassName : defaultUnhighlightedClassName
  }`;

  return (
    <div className="relative">
      <div
        className={highlightClassName}
        style={{
          position: 'absolute',
          transition: `all ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
      <div
        className={defaultClassName}
        style={{ position: 'relative' }}
      >
        {child}
      </div>
    </div>
  );
};