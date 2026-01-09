import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T { //default delay to 500ms
  const [debouncedValue, setDebouncedValue] = useState<T>(value); //state to hold debounced value

  useEffect(() => {
    const handler = setTimeout(() => { //set timeout to update debounced value
      setDebouncedValue(value); //update debounced value after delay
    }, delay);

    return () => {
      clearTimeout(handler); //clear timeout if value or delay changes
    };
  }, [value, delay]);

  return debouncedValue;
}
