import { useEffect } from "react";
import { EActionTypes, TContext } from "./types";

const localStorageName = "idea-board-state";

const usePersistState = ({ state, dispatch }: TContext) => {
  // restore state from local storage
  useEffect(() => {
    const localStorageState = window.localStorage.getItem(localStorageName);
    if (localStorageState) {
      dispatch({
        type: EActionTypes.SET_IDEAS,
        payload: JSON.parse(localStorageState),
      });
    }
  }, [dispatch]);

  // save state to local storage
  useEffect(() => {
    const saveStateToLocalStorage = () => {
      window.localStorage.setItem(
        localStorageName,
        JSON.stringify(state.ideas) // intentionally storing ideas array only
      );
    };

    window.addEventListener("beforeunload", saveStateToLocalStorage);
  }, [state]);

  return null;
};

export { usePersistState };
