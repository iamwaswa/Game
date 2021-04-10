import { OrNull } from "../../../types";
import { View } from "../../../enums";

interface IPickAppViewActionsProps {
  view: View;
  updateView: (newView: View) => () => void;
}

export function PickAppViewActions({ 
  view, 
  updateView 
}: IPickAppViewActionsProps): OrNull<JSX.Element> {
  return (
    <div className="actions">
      <button onClick={updateView(View.CHOOSE_USER)}>
        Choose different user
      </button>
      <button 
        onClick={
          updateView(view === View.GAME ? View.LEADERBOARD_TABLE : View.GAME)
        }>
        {view === View.GAME ? `Leaderboard` : `Game`}
      </button>
    </div>
  );
  
}