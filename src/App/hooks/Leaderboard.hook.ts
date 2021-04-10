import { LeaderboardReducerActionType, State, initialState, reducer } from "./Leaderboard.reducer";
import { useCallback, useEffect, useReducer } from "react";

interface IUseLeaderboardActions {
  addUser: (displayName: string) => void;
  selectUser: (userId: number) => void;
  updateUserTopScore: (topScore: number) => void;
}

/**
 * Manages the leaderboard state.
 * @param onUserChanged A callback to trigger when a user is changed
 * @returns The leaderboard state
 */
export function useLeaderboard(
  onUserChanged: () => void
): [State, IUseLeaderboardActions] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = useCallback((displayName: string): void => {
    dispatch({
      type: LeaderboardReducerActionType.ADD_USER,
      payload: {
        displayName,
      },
    });
  }, []);

  const selectUser = useCallback((userId: number): void => {
    dispatch({
      type: LeaderboardReducerActionType.SELECT_USER,
      payload: {
        userId,
      },
    });
  }, []);

  const updateUserTopScore = useCallback((
    topScore: number
  ): void => {
    dispatch({
      type: LeaderboardReducerActionType.UPDATE_USER_TOP_SCORE,
      payload: {
        topScore,
      },
    });
  }, []);

  useEffect((): void => {
    if (state.error) {
      alert(state.error);
      dispatch({
        type: LeaderboardReducerActionType.CLEAR_ERROR,
      });
    }
  }, [state]);

  useEffect((): void => {
    if (state.userChanged) {
      onUserChanged();

      dispatch({
        type: LeaderboardReducerActionType.RESET_USER_CHANGED,
      });
    }
  }, [state, onUserChanged]);

  return [state, { addUser, selectUser, updateUserTopScore }];
}