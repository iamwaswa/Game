import { IUseGameActions } from "../../../hooks";

interface IGameMovesProps {
  actions: IUseGameActions;
}

export function GameMoves({ actions }: IGameMovesProps): JSX.Element {
  return (
    <div className="moves">
      <button className="move" onClick={actions.turnRobotLeft90Degrees}>
        Turn left 90°
      </button>
      <button className="move" onClick={actions.moveRobotForward}>
        Go forward
      </button>
      <button className="move" onClick={actions.turnRobotRight90Degrees}>
        Turn right 90°
      </button>
    </div>
  )
}