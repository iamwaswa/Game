import { GameBoardPosition, GameState, OrUndefined } from "../../types";

import { RobotDirection } from "../../enums";
import { positionsMatch } from "../../utils";

export enum GameReducerActionType {
  GO_FORWARD,
  TIME_UP,
  TURN_LEFT_90_DEGREES,
  TURN_RIGHT_90_DEGREES,
  RESET,
}

type GameReducerAction = 
  | {
      type: GameReducerActionType.GO_FORWARD;
    } 
  | {
      type: GameReducerActionType.RESET;
    }  
  | {
      type: GameReducerActionType.TIME_UP;
    }  
  | {
      type: GameReducerActionType.TURN_LEFT_90_DEGREES;
    }
  | {
      type: GameReducerActionType.TURN_RIGHT_90_DEGREES;
    };

export function initialState(
  numberOfColumns: number, 
  numberOfRows: number
): GameState {
  const robotPosition = generateRandomGameBoardPosition(
    numberOfColumns,
    numberOfRows,
  );
    
  let goal: OrUndefined<GameBoardPosition>;
  
  do {
    goal = generateRandomGameBoardPosition(
      numberOfColumns,
      numberOfRows,
    );
  } while (goal?.column === robotPosition.column || goal?.row === robotPosition.row);
  
  return {
    bounds: {
      maxColumn: numberOfColumns,
      maxRow: numberOfRows,
      minColumn: 1,
      minRow: 1,
    },
    goal,
    outOfBounds: false,
    points: 0,
    robot: {
      direction: RobotDirection.UP,
      position: robotPosition,
    },
    timeUp: false,
  };
}

/**
 * Generates a random game board position.
 * @param numberOfColumns The number of columns of the game board
 * @param numberOfRows The number of rows of the game board
 * @returns The randomly generated game board position
 */
function generateRandomGameBoardPosition(
  numberOfColumns: number, 
  numberOfRows: number
): GameBoardPosition {
  return {
    column: getValueInRange(1, numberOfColumns),
    row: getValueInRange(1, numberOfRows),
  }
}

/**
 * Gets a random number at least min and at most max.
 * @param min The minimum values to pick
 * @param max The maximum value to pick
 * @returns A value within the min and max range inclusive
 */
function getValueInRange(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

export function reducer(
  numberOfColumns: number,
  numberOfRows: number,
): (state: GameState, action: GameReducerAction) => GameState {
  return (
    state: GameState = initialState(numberOfColumns, numberOfRows), 
    action: GameReducerAction
  ): GameState => {
    switch (action.type) {
      case GameReducerActionType.GO_FORWARD: {
        const newRobotPosition = moveRobotForward(
          state.robot.direction, 
          state.robot.position
        );

        let goal: OrUndefined<GameBoardPosition>;
  
        do {
          goal = generateRandomGameBoardPosition(
            numberOfColumns,
            numberOfRows,
          );
        } while (
          goal?.column === newRobotPosition.column || 
          goal?.row === newRobotPosition.row
        );

        if (positionsMatch(state.goal, newRobotPosition)) {
          return {
            ...initialState(numberOfColumns, numberOfRows),
            goal,
            points: state.points + 1,
            robot: {
              ...state.robot,
              position: newRobotPosition,
            },
          };
        }

        if (
          newRobotPosition.column > state.bounds.maxColumn || 
          newRobotPosition.row > state.bounds.maxRow ||
          newRobotPosition.column < state.bounds.minColumn ||
          newRobotPosition.row < state.bounds.minRow
        ) {
          return {
            ...state,
            outOfBounds: true,
            robot: {
              ...state.robot,
              position: newRobotPosition,
            },
          }
        }

        return {
          ...state,
          robot: {
            ...state.robot,
            position: newRobotPosition,
          },
        };
      }
      
      case GameReducerActionType.RESET: {
        return initialState(numberOfColumns, numberOfRows);
      }

      
      case GameReducerActionType.TIME_UP: {
        return {
          ...state,
          timeUp: true,
        };
      }

      case GameReducerActionType.TURN_LEFT_90_DEGREES: {
        return {
          ...state,
          robot: {
            ...state.robot,
            direction: turnRobotLeft90Degrees(state.robot.direction),
          }
        };
      }
      
      case GameReducerActionType.TURN_RIGHT_90_DEGREES: {
        return {
          ...state,
          robot: {
            ...state.robot,
            direction: turnRobotRight90Degrees(state.robot.direction),
          }
        };
      }
      
      default: {
        return state;
      }
    }
  }
}

/**
 * Turns the robot left 90 degrees.
 * @param direction The current direction of the robot
 * @returns The updated direction of the robot
 */
function turnRobotLeft90Degrees(direction: RobotDirection): RobotDirection {
  switch (direction) {
    case RobotDirection.DOWN: {
      return RobotDirection.RIGHT;
    }
    
    case RobotDirection.LEFT: {
      return RobotDirection.DOWN;
    }

    case RobotDirection.RIGHT: {
      return RobotDirection.UP;
    }
    
    case RobotDirection.UP: {
      return RobotDirection.LEFT;
    }
  }
}

/**
 * Turns the robot right 90 degrees.
 * @param direction The current direction of the robot
 * @returns The updated direction of the robot
 */
function turnRobotRight90Degrees(direction: RobotDirection): RobotDirection {
  switch (direction) {
    case RobotDirection.DOWN: {
      return RobotDirection.LEFT;
    }
    
    case RobotDirection.LEFT: {
      return RobotDirection.UP;
    }

    case RobotDirection.RIGHT: {
      return RobotDirection.DOWN;
    }
    
    case RobotDirection.UP: {
      return RobotDirection.RIGHT;
    }
  }
}

/**
 * Moves the robot forward in the direction it is currently facing.
 * @param direction The current direction of the robot
 * @param position The current position of the robot
 * @returns The updated position of the robot
 */
function moveRobotForward(
  direction: RobotDirection, 
  position: GameBoardPosition
): GameBoardPosition {
  switch (direction) {
    case RobotDirection.DOWN: {
      return {
        ...position,
        row: position.row + 1,
      }
    }
    
    case RobotDirection.LEFT: {
      return {
        ...position,
        column: position.column - 1,
      }
    }
    
    case RobotDirection.RIGHT: {
      return {
        ...position,
        column: position.column + 1,
      }
    }
    
    case RobotDirection.UP: {
      return {
        ...position,
        row: position.row - 1,
      }
    }
  }
}
