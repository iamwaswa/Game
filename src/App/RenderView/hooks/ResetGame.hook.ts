import { useEffect, useRef } from "react";

import { View } from "../../../enums";

/**
 * Manages resetting the game.
 * @param view The current view
 * @param resetGame A callback to reset the game
 */
export function useResetGame(
  view: View,
  resetGame: () => void
): void {
  const reset = useRef<() => void>(resetGame);

  useEffect((): void => {
    reset.current();
  }, [view]);
}