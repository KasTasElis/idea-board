import { createContext, useContext, useReducer } from "react";
import { ESortingOptions, TContext, TGlobalState } from "./types";
import { usePersistState } from "./usePersistState";
import { reducer } from "./reducer";

const initialState: TGlobalState = {
  ideas: [],
  notifications: [],
  ideaSorting: ESortingOptions.BY_DATE_DESCENDING,
};

const initialContext: TContext = {
  state: initialState,
  dispatch: () => {
    undefined;
  },
};

const GlobalStateContext = createContext(initialContext);

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  usePersistState({ state, dispatch });

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalStateContext);

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalStateProvider, useGlobalState, initialState };
