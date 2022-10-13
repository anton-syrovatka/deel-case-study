import React from "react";

type useDebounceReturn = {
  value: string;
};

export const useDebounce = (
  value: string,
  delay: number
): useDebounceReturn => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return { value: debouncedValue };
};
