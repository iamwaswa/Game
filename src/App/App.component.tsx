import { useGame, useLeaderboard, useView } from "./hooks";

import { PickAppView } from "./PickView";
import { RenderAppView } from "./RenderView";
import { View } from "../enums";
import { useRef } from "react";

export function App(): JSX.Element {
  const numberOfColumns = useRef<number>(5);

  const numberOfRows = useRef<number>(5);

  const gameTimeLimitInSeconds = useRef<number>(60);

  const [
    { leaderboard, userId }, 
    { addUser, selectUser, updateUserTopScore }
  ] = useLeaderboard(
    onUserChanged
  );
  
  const [gameState, gameActions] = useGame(
    numberOfColumns.current, 
    numberOfRows.current, 
    updateUserTopScore
  );

  const { view, updateView } = useView();

  function onUserChanged(): void {
    gameActions.resetGame();
    updateView(View.GAME)();
  }

  return (
    <main className="app">
      <PickAppView 
        view={view} 
        updateView={updateView} 
      />
      <RenderAppView 
        gameActions={gameActions}
        gameState={gameState}
        gameTimeLimitInSeconds={gameTimeLimitInSeconds.current}
        leaderboard={leaderboard} 
        numberOfColumns={numberOfColumns.current}
        numberOfRows={numberOfRows.current}
        view={view} 
        userId={userId}
        addUser={addUser} 
        selectUser={selectUser} 
        updateUserTopScore={updateUserTopScore} 
      />
    </main>
  );
}