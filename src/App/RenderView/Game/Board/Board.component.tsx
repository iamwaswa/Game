import { GameBoardPosition, RobotState } from "../../../../types";

import { GameBoardCell } from "./Cell";

interface IGameBoardProps {
  goalPosition: GameBoardPosition;
  numberOfColumns: number;
  numberOfRows: number;
  robotState: RobotState;
}

export function GameBoard({ 
  goalPosition,
  numberOfColumns, 
  numberOfRows,
  robotState,
}: IGameBoardProps): JSX.Element {
  return (
    <div className="board">
      {Array(numberOfRows).fill(undefined).map((_, rowIndex) => (
        <div key={`row-${rowIndex + 1}`} className="row">
          {Array(numberOfColumns).fill(undefined).map((_, columnIndex) => (
            <GameBoardCell 
              key={`row-${rowIndex + 1} col-${columnIndex + 1}`} 
              cellPosition={{
                column: columnIndex + 1,
                row: rowIndex + 1,
              }} 
              goalPosition={goalPosition}
              robotDirection={robotState.direction}
              robotPosition={robotState.position}
            />
          ))}
        </div>
      ))}
    </div>
  )
}