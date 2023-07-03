/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import { AddNewIdea, IdeaCard, SortOptions, TIdea } from "./components";

// Whats my global state?
const ideas: TIdea[] = [
  {
    id: "123",
    title: "Idea title",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore doloremque, dignissimos modi maiores numquam quidem quo odit? Non ipsum temporibus magnam sapiente! Quo ipsam illum dolor aliquid. Voluptas, atque porro?",
    createdAt: 12345,
  },
  {
    id: "321",
    title: "Idea title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde qui architecto, fugit hic aliquid molestias adipisci, dolorem officiis aliquam temporibus labore, numquam sit voluptatem debitis provident deserunt ipsa beatae expedita.",
    createdAt: 12477,
    updatedAt: 12477,
  },
];

type TGlobalState = {
  ideas: TIdea[];
};

type TContext = {
  state: TGlobalState;
  dispatch: React.Dispatch<TAction>;
};

const initialContext: TContext = {
  state: {
    ideas: [],
  },
  dispatch: () => undefined,
};

const GlobalState = createContext(initialContext);

const initialState: TGlobalState = {
  ideas,
};

export const useGlobalState = () => useContext(GlobalState);

export enum EActionTypes {
  ADD_IDEA = "ADD_IDEA",
  DELETE_IDEA = "DELETE_IDEA",
  UPDATE_IDEA = "UPDATE_IDEA",
}

type TAction = {
  type: EActionTypes;
  payload: TIdea;
};

const reducer = (state: TGlobalState, action: TAction) => {
  switch (action.type) {
    case EActionTypes.ADD_IDEA:
      return { ...state, ideas: [action.payload, ...state.ideas] };
    case EActionTypes.DELETE_IDEA:
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== action.payload.id),
      };
    case EActionTypes.UPDATE_IDEA:
      return {
        ...state,
        ideas: state.ideas.map((idea) => {
          if (idea.id === action.payload.id) {
            return action.payload;
          }
          return idea;
        }),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          <div className="mb-16">
            <AddNewIdea />
          </div>

          {state.ideas.length ? (
            <>
              <div className="mb-5">
                <SortOptions />
              </div>
              {state.ideas.map((idea) => (
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
