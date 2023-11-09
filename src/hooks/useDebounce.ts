import { useCallback, useRef } from "react";

export default function useDebounce<T>(callback: (...args: T[]) => void, delay: number) {
  const timer = useRef<any>(null);

  const debouncedCallback = useCallback((...args: T[]) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debouncedCallback
}
