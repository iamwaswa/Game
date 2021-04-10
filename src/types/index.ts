import { RobotDirection } from "../enums";

export type OrNull<TType> = null | TType;

export type OrUndefined<TType> = undefined | TType;

export type User = {
  displayName: string;
  id: number;
  rank: number;
  topScore: number;
};

export type GameBoardPosition = {
  column: number;
  row: number;
};

export type GameBoardBounds = {
  maxColumn: number;
  maxRow: number;
  minColumn: number;
  minRow: number;
}

export type RobotState = {
  direction: RobotDirection;
  position: GameBoardPosition;
};

export type GameState = {
  bounds: GameBoardBounds;
  goal: GameBoardPosition;
  outOfBounds: boolean;
  points: number;
  robot: RobotState;
  timeUp: boolean;
}