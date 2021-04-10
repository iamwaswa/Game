import { GameBoardCellGoal } from "./Goal";
import { GameBoardCellRobot } from "./Robot";
import { GameBoardPosition } from "../../../../../types";
import { RobotDirection } from "../../../../../enums";
import { positionsMatch } from "../../../../../utils";

interface IGameBoardCellProps {
  cellPosition: GameBoardPosition;
  goalPosition: GameBoardPosition;
  robotDirection: RobotDirection;
  robotPosition: GameBoardPosition;
}

export function GameBoardCell({ 
  cellPosition, 
  goalPosition,
  robotDirection, 
  robotPosition 
}: IGameBoardCellProps): JSX.Element {
  return (
    <div className="cell">
      {positionsMatch(cellPosition, robotPosition) 
        ? <GameBoardCellRobot robotDirection={robotDirection} /> 
        : null
      }
      {positionsMatch(cellPosition, goalPosition) 
        ? <GameBoardCellGoal /> 
        : null
      }
    </div>
  )
}
