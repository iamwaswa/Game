import { OrNull } from "../../types";
import { PickAppViewActions } from "./Actions";
import { View } from "../../enums";
import { useIsChooseUserView } from "./hooks";

interface IPickAppViewProps {
  view: View;
  updateView: (newView: View) => () => void;
}

export function PickAppView({ 
  view, 
  updateView 
}: IPickAppViewProps): OrNull<JSX.Element> {
  const isChooseUserView = useIsChooseUserView(view);
  
  return isChooseUserView 
    ? null 
    : <PickAppViewActions view={view} updateView={updateView} />;
  
}