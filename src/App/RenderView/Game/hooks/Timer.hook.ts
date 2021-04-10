import { useCallback, useEffect, useRef, useState } from "react";

import { OrUndefined } from "../../../../types";

/**
 * Manages the game time state.
 * @param initialTimeLimitInSeconds The initial time limit in seconds
 * @param restartTimer Status for restarting the timer
 * @param onTimeUp A callback to fire when the time is up
 * @returns The printed time remaining for the game
 */
export function useTimer(
  initialTimeLimitInSeconds: number,
  restartTimer: boolean,
  onTimeUp: () => void,
): string {
  let interval = useRef<OrUndefined<NodeJS.Timer>>();
  
  const [time, setTime] = useState<number>(initialTimeLimitInSeconds);

  const onIntervalReached = useCallback((): void => {
    setTime(currentTime => currentTime === 0 ?  currentTime : currentTime - 1);
  }, []);
  
  useEffect((): () => void => {
    if (restartTimer) {
      setTime(initialTimeLimitInSeconds);
      interval.current = setInterval(onIntervalReached, 1000);
    }
    
    return (): void => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [initialTimeLimitInSeconds, restartTimer, onIntervalReached]);

  useEffect((): void => {
    if (time === 0) {
      if (interval.current) {
        clearInterval(interval.current);  
      }

      onTimeUp();
    }
  }, [time, onTimeUp]);

  return new Intl.RelativeTimeFormat(
    navigator.language, 
    { style: `long`, numeric: `auto` }
  ).format(time, `seconds`);
}