import { GameBoardPosition } from "../types";

/**
 * Determines whether the two given positions match.
 * @param position The first position to match
 * @param otherPosition The second position to match
 * @returns Whether the positions match
 */
export function positionsMatch(
  position: GameBoardPosition, 
  otherPosition: GameBoardPosition
): boolean {
  return position.column === otherPosition.column &&
    position.row === otherPosition.row;
}