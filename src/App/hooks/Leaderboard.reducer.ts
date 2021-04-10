import { OrNull, User } from "../../types";

export enum LeaderboardReducerActionType {
  ADD_USER,
  CLEAR_ERROR,
  RESET_USER_CHANGED,
  SELECT_USER,
  UPDATE_USER_TOP_SCORE,
}

export type LeaderboardReducerAction = 
  | {
      type: LeaderboardReducerActionType.ADD_USER;
      payload: {
        displayName: string;
      };
    } 
  | {
      type: LeaderboardReducerActionType.CLEAR_ERROR;
    } 
  | {
    type: LeaderboardReducerActionType.RESET_USER_CHANGED,
  } 
  | {
      type: LeaderboardReducerActionType.SELECT_USER;
      payload: {
        userId: number;
      };
    } 
  | {
      type: LeaderboardReducerActionType.UPDATE_USER_TOP_SCORE;
      payload: {
        topScore: number;
      };
    };

export type State = {
  error: OrNull<string>;
  leaderboard: Array<User>;
  userChanged: boolean;
  userId: OrNull<number>;
}

export const initialState: State = {
  error: null,
  leaderboard: [],
  userChanged: false,
  userId: null,
}

const getUserId = generateUserId();

export function reducer(
  state: State = initialState, 
  action: LeaderboardReducerAction
): State {
  switch (action.type) {
    case LeaderboardReducerActionType.ADD_USER: {
      if (state.leaderboard.find(
        user => user.displayName === action.payload.displayName
      )) {
        return {
          ...state,
          error: `A user with that display name already exists! Try selecting that user from the list`,
        };
      }

      const userId = getUserId.next().value;
      
      return {
        ...state, 
        leaderboard: state.leaderboard.concat([
          { 
            displayName: action.payload.displayName, 
            id: userId,
            rank: state.leaderboard.length + 1,
            topScore: 0,
          }
        ]),
        userChanged: true,
        userId,
      };
    }

    case LeaderboardReducerActionType.CLEAR_ERROR: {
      return { 
        ...state,
        error: null,
      };
    }

    case LeaderboardReducerActionType.RESET_USER_CHANGED: {
      return {
        ...state,
        userChanged: false,
      };
    }

    case LeaderboardReducerActionType.SELECT_USER: {
      if (state.leaderboard.find(
        user => user.id === action.payload.userId
      )) {
        return {
          ...state,
          userChanged: true,
          userId: action.payload.userId,
        };
      }
      
      return {
        ...state,
        error: `The selected option does not match a valid user! Try select a different user`,
      };
    }

    case LeaderboardReducerActionType.UPDATE_USER_TOP_SCORE: {
      return {
        ...state,
        leaderboard: state.leaderboard.map(user => user.id === state.userId 
            ? ({
                ...user,
                topScore: Math.max(user.topScore, action.payload.topScore),
              }) 
            : user
        )
        .sort(
          (user, otherUser) => user.topScore - otherUser.topScore
        )
        .reverse()
        .map((user, index) => ({
          ...user,
          rank: index + 1,
        }))
      };
    }
    
    default: {
      return state;
    }
  }
}

/**
 * Generator function for user id.
 */
function* generateUserId(): Generator<number, number, number> {
  let userId = 1;

  while (true) {
    yield userId;
    userId++;
  }
}
