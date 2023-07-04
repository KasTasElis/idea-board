import { createContext, useContext, useEffect, useReducer } from "react";
import {
  EActionTypes,
  ESortingOptions,
  TAction,
  TContext,
  TGlobalState,
} from "./types";

const initialContext: TContext = {
  state: {
    ideas: [],
    notifications: [],
    ideaSorting: ESortingOptions.BY_DATE_ASCENDING,
  },
  dispatch: () => undefined,
};

const GlobalStateContext = createContext(initialContext);

const localStorageName = "idea-board-state";

const reducer = (state: TGlobalState, action: TAction<EActionTypes>) => {
  switch (action.type) {
    case EActionTypes.ADD_IDEA:
      return {
        ...state,
        ideas: [action.payload, ...state.ideas],
      };
    case EActionTypes.DELETE_IDEA:
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.payload.id),
      };
    case EActionTypes.EDIT_IDEA:
      return {
        ...state,
        ideas: state.ideas.map((idea) => {
          if (idea.id === action.payload.id) {
            return action.payload;
          }
          return idea;
        }),
      };
    case EActionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case EActionTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload.id
        ),
      };
    case EActionTypes.RESTORE_STATE_FROM_LOCAL_STORAGE:
      return {
        ...action.payload,
        notifications: [],
      };
    case EActionTypes.SET_IDEA_SORTING_OPTION:
      return {
        ...state,
        ideaSorting: action.payload,
      };
    default:
      return state;
  }
};

const initialState: TGlobalState = {
  ideas: [],
  notifications: [],
  ideaSorting: ESortingOptions.BY_DATE_ASCENDING,
};

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // restore state from local storage
  useEffect(() => {
    const localStorageState = window.localStorage.getItem(localStorageName);
    if (localStorageState) {
      dispatch({
        type: EActionTypes.RESTORE_STATE_FROM_LOCAL_STORAGE,
        payload: JSON.parse(localStorageState),
      });
    }
  }, [dispatch]);

  // save state to local storage
  useEffect(() => {
    const saveStateToLocalStorage = () => {
      window.localStorage.setItem(localStorageName, JSON.stringify(state));
    };

    window.addEventListener("beforeunload", saveStateToLocalStorage);
  }, [state]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalStateProvider, useGlobalState };
