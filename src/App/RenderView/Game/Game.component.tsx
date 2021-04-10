import { GameState, User } from "../../../types";

import { GameBoard } from "./Board";
import { GameMoves } from "./Moves";
import { IUseGameActions } from "../../hooks";
import { useTimer } from "./hooks";

interface IGameProps {
  gameActions: IUseGameActions;
  gameState: GameState;
  gameTimeLimitInSeconds: number;
  numberOfColumns: number;
  numberOfRows: number;
  user?: User;
}

export function Game({ 
  gameActions,
  gameState,
  gameTimeLimitInSeconds,
  numberOfColumns,
  numberOfRows,
  user,
}: IGameProps): JSX.Element {
  const timeRemaining = useTimer(
    gameTimeLimitInSeconds,
    !gameState.timeUp && !gameState.outOfBounds,
    gameActions.timeUp,
  );

  return (
    <div className="game">
      <div className="details">
        <div className="user">
          {user ? <span>User: {user.displayName}</span> : null}
          {<span>Points: {gameState.points}</span>}
        </div>
        <div className="time">
          <span>Game ends {timeRemaining}</span>
        </div>
      </div>
      <GameBoard 
        goalPosition={gameState.goal}
        numberOfColumns={numberOfColumns} 
        numberOfRows={numberOfRows} 
        robotState={gameState.robot} 
      />
      <GameMoves actions={gameActions} />
    </div>
  )
}