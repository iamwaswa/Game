import { GameReducerActionType, initialState, reducer } from "./Game.reducer";
import { useCallback, useEffect, useReducer } from "react";

import { GameState } from "../../types";

export interface IUseGameActions {
  moveRobotForward: () => void;
  resetGame: () => void;
  timeUp: () => void;
  turnRobotLeft90Degrees: () => void;
  turnRobotRight90Degrees: () => void;
}

/**
 * Manages the game state.
 * @param numberOfColumns The number of columns for the game board
 * @param numberOfRows The number of rows for the game board
 * @returns The game state
 */
export function useGame(
  numberOfColumns: number,
  numberOfRows: number,
  updateUserTopScore: (topScore: number) => void
): [GameState, IUseGameActions] {
  const [state, dispatch] = useReducer(
    reducer(numberOfColumns, numberOfRows), 
    initialState(numberOfColumns, numberOfRows)
  );

  const moveRobotForward = useCallback((): void => {
    dispatch({
      type: GameReducerActionType.GO_FORWARD,
    })
  }, []);

  const resetGame = useCallback((): void => {
    dispatch({
      type: GameReducerActionType.RESET,
    })
  }, []);

  const timeUp = useCallback((): void => {
    dispatch({
      type: GameReducerActionType.TIME_UP,
    })
  }, []);

  const turnRobotLeft90Degrees = useCallback((): void => {
    dispatch({
      type: GameReducerActionType.TURN_LEFT_90_DEGREES,
    })
  }, []);

  const turnRobotRight90Degrees = useCallback((): void => {
    dispatch({
      type: GameReducerActionType.TURN_RIGHT_90_DEGREES,
    })
  }, []);

  useEffect((): void => {
    if (state.outOfBounds) {
      alert(`Whoops! Looks like you went out of bounds, Click okay to start over`);
      resetGame();
    }
  }, [state, resetGame]);

  useEffect((): void => {
    if (state.timeUp) {
      alert(`Time's up! Click okay to start over`);
      resetGame();
    }
  }, [state, resetGame]);

  useEffect((): void => {
    updateUserTopScore(state.points);
  }, [state, updateUserTopScore]);

  return [
    state, 
    { 
      moveRobotForward, 
      resetGame,
      timeUp,
      turnRobotLeft90Degrees, 
      turnRobotRight90Degrees,
    },
  ];
}