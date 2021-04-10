import { GameState, OrNull, User } from "../../types";

import { ChooseUser } from "./ChooseUser";
import { Game } from "./Game";
import { IUseGameActions } from "../hooks";
import { LeaderboardTable } from "./LeaderboardTable";
import { View } from "../../enums";
import { useResetGame } from "./hooks";

interface IRenderAppViewProps {
  gameActions: IUseGameActions;
  gameState: GameState;
  gameTimeLimitInSeconds: number;
  leaderboard: Array<User>;
  numberOfColumns: number;
  numberOfRows: number;
  view: View;
  userId: OrNull<number>;
  addUser: (displayName: string) => void;
  selectUser: (userId: number) => void;
  updateUserTopScore: (topScore: number) => void;
}

export function RenderAppView({ 
  gameActions,
  gameState,
  gameTimeLimitInSeconds,
  leaderboard, 
  numberOfColumns,
  numberOfRows,
  view, 
  userId,
  selectUser,
  addUser,
}: IRenderAppViewProps): JSX.Element {
  useResetGame(view, gameActions.resetGame);
  
  switch (view) {
    case View.CHOOSE_USER: {
      return (
        <ChooseUser 
          users={leaderboard}
          onUserAdded={addUser} 
          onUserSelected={selectUser} 
        />
      );
    }

    case View.GAME: {
      return (
        <Game 
          gameActions={gameActions} 
          gameState={gameState} 
          gameTimeLimitInSeconds={gameTimeLimitInSeconds} 
          numberOfColumns={numberOfColumns}
          numberOfRows={numberOfRows}
          user={leaderboard.find(user => user.id === userId)}
        />
      );
    }
    
    case View.LEADERBOARD_TABLE: {
      return <LeaderboardTable leaderboard={leaderboard} />;
    }
  }
}