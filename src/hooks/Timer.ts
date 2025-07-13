import { useEffect, useRef } from 'react';

interface TimerProps  {
  target: number;
  callback: () => void;
};

export function useTimer(props: TimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval
    intervalRef.current = setInterval(() => {
      props.callback();
    }, props.target);
  };

  useEffect(() => {
    startInterval(); // Start on mount

    return () => {
      // Clear on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalRef.current, props.callback]);
}
