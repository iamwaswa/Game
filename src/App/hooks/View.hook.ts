import { View } from "../../enums";
import { useState } from "react";

interface IUseView {
  view: View;
  updateView: (newView: View) => () => void;
}

/**
 * Manages the view state.
 * @returns The view state
 */
export function useView(): IUseView {
  const [view, setView] = useState<View>(View.CHOOSE_USER);

  function updateView(newView: View): () => void {
    return (): void => {
      setView(newView);
    };
  }

  return {
    view,
    updateView,
  };
}