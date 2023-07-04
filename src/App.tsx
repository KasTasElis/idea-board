/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  AddNewIdea,
  IdeaCard,
  SortOptions,
  TIdea,
  Notifications,
} from "./components";

export type TNotification = {
  message: string;
  id: string;
};

export enum ESortingOptions {
  BY_DATE_ASCENDING = "Oldest",
  BY_DATE_DESCENDING = "Latest",
  A_Z = "A-Z",
  Z_A = "Z-A",
}

type TGlobalState = {
  ideas: TIdea[];
  notifications: TNotification[];
  ideaSorting: ESortingOptions;
};

type TContext = {
  state: TGlobalState;
  dispatch: React.Dispatch<TAction<EActionTypes>>;
};

const initialContext: TContext = {
  state: {
    ideas: [],
    notifications: [],
    ideaSorting: ESortingOptions.BY_DATE_ASCENDING,
  },
  dispatch: () => undefined,
};

const GlobalState = createContext(initialContext);

const initialState: TGlobalState = {
  ideas: [],
  notifications: [],
  ideaSorting: ESortingOptions.BY_DATE_ASCENDING,
};

export const useGlobalState = () => useContext(GlobalState);

export enum EActionTypes {
  ADD_IDEA = "ADD_IDEA",
  DELETE_IDEA = "DELETE_IDEA",
  EDIT_IDEA = "EDIT_IDEA",
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION",
  RESTORE_STATE_FROM_LOCAL_STORAGE = "RESTORE_STATE_FROM_LOCAL_STORAGE",
  SET_IDEA_SORTING_OPTION = "SET_IDEA_SORTING_OPTION",
}

type TAction<T extends EActionTypes> = T extends
  | EActionTypes.ADD_IDEA
  | EActionTypes.DELETE_IDEA
  | EActionTypes.EDIT_IDEA
  ? {
      type: T;
      payload: TIdea;
    }
  : T extends EActionTypes.SHOW_NOTIFICATION | EActionTypes.DELETE_NOTIFICATION
  ? {
      type: T;
      payload: TNotification;
    }
  : T extends EActionTypes.RESTORE_STATE_FROM_LOCAL_STORAGE
  ? {
      type: T;
      payload: TGlobalState;
    }
  : T extends EActionTypes.SET_IDEA_SORTING_OPTION
  ? {
      type: T;
      payload: ESortingOptions;
    }
  : never;

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

const sortIdeasAlphabeticallyByTitle = (
  ideas: TIdea[],
  sortOrder: ESortingOptions.A_Z | ESortingOptions.Z_A
) =>
  [...ideas].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (sortOrder === ESortingOptions.A_Z) {
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
    } else if (sortOrder === ESortingOptions.Z_A) {
      if (titleA > titleB) return -1;
      if (titleA < titleB) return 1;
    }

    return 0;
  });

const sortIdeasByDate = (
  ideas: TIdea[],
  sortOrder:
    | ESortingOptions.BY_DATE_ASCENDING
    | ESortingOptions.BY_DATE_DESCENDING
) =>
  [...ideas].sort((a, b) => {
    const dateA = a.updatedAt || a.createdAt;
    const dateB = b.updatedAt || b.createdAt;

    if (sortOrder === ESortingOptions.BY_DATE_ASCENDING) {
      return dateA - dateB;
    } else if (sortOrder === ESortingOptions.BY_DATE_DESCENDING) {
      return dateB - dateA;
    }

    return 0;
  });

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ideasSorted = useMemo(() => {
    if (
      state.ideaSorting === ESortingOptions.Z_A ||
      state.ideaSorting === ESortingOptions.A_Z
    ) {
      return sortIdeasAlphabeticallyByTitle(state.ideas, state.ideaSorting);
    }

    if (
      state.ideaSorting === ESortingOptions.BY_DATE_ASCENDING ||
      state.ideaSorting === ESortingOptions.BY_DATE_DESCENDING
    ) {
      return sortIdeasByDate(state.ideas, state.ideaSorting);
    }

    return state.ideas;
  }, [state.ideas, state.ideaSorting]);

  // restore state from local storage
  useEffect(() => {
    const localStorageName = "idea-board-state";

    const localStorageState = window.localStorage.getItem(localStorageName);
    if (localStorageState) {
      dispatch({
        type: EActionTypes.RESTORE_STATE_FROM_LOCAL_STORAGE,
        payload: JSON.parse(localStorageState),
      });
    }
  }, []);

  // save state to local storage
  useEffect(() => {
    const localStorageName = "idea-board-state";

    const saveStateToLocalStorage = () => {
      window.localStorage.setItem(localStorageName, JSON.stringify(state));
    };

    // Attach the beforeUnmount function to the beforeunload event
    window.addEventListener("beforeunload", saveStateToLocalStorage);
  }, [state]);

  return (
    <div className="p-3">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center text-center gap-2">
          <div className="text-5xl">🤔</div>
          <h1 className="text-3xl font-bold mb-7 text-center text-teal-900">
            Idea Board
          </h1>
        </div>

        <GlobalState.Provider value={{ state, dispatch }}>
          <Notifications />

          <div className="mb-16">
            <AddNewIdea />
          </div>

          {ideasSorted.length ? (
            <>
              <div className="mb-5">
                <SortOptions />
              </div>

              {ideasSorted.map((idea) => (
                <div className="mb-5" key={idea.id}>
                  <IdeaCard idea={idea} />
                </div>
              ))}
            </>
          ) : null}
        </GlobalState.Provider>
      </div>
    </div>
  );
};

export default App;
