import { RobotDirection } from "../../../../../../enums";

interface IGameBoardCellRobotProps {
  robotDirection: RobotDirection;
}

export function GameBoardCellRobot({ robotDirection }: IGameBoardCellRobotProps): JSX.Element {
  return (
    <div className="robot" data-robot-direction={robotDirection}>
    </div>
  )
}