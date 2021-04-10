import { View } from "../../../enums";
import { useMemo } from "react";

/**
 * Determines whether the current view is the choose user view.
 * @param view The current view
 * @returns Whether the current view is the choose user view
 */
export function useIsChooseUserView(view: View): boolean {
  return useMemo((): boolean => {
    return view === View.CHOOSE_USER;
  }, [view]);
}