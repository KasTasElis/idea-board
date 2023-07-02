import { createContext, useContext, useState } from "react";
import { AddNewIdea, IdeaCard, SortOptions, TIdea } from "./components";

// Whats my global state?
const ideas: { [key: string]: TIdea } = {
  "123": {
    id: "123",
    title: "Idea title",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore doloremque, dignissimos modi maiores numquam quidem quo odit? Non ipsum temporibus magnam sapiente! Quo ipsam illum dolor aliquid. Voluptas, atque porro?",
    createdAt: 12345,
  },
  "321": {
    id: "321",
    title: "Idea title 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde qui architecto, fugit hic aliquid molestias adipisci, dolorem officiis aliquam temporibus labore, numquam sit voluptatem debitis provident deserunt ipsa beatae expedita.",
    createdAt: 12477,
    updatedAt: 12477,
  },
};

type TGlobalState = {
  ideas: { [key: string]: TIdea };
};

type TContext = {
  state: TGlobalState;
  setState: (state: TGlobalState) => void;
};

const initialContext: TContext = {
  state: {
    ideas: {},
  },
  setState: () => undefined,
};

const GlobalState = createContext(initialContext);

const initialState: TGlobalState = {
  ideas: ideas,
};

export const useGlobalState = () => useContext(GlobalState);

const App = () => {
  const [state, setState] = useState(initialState);

  return (
    <div className="p-3">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center text-center gap-2">
          <div className="text-5xl">🤔</div>
          <h1 className="text-3xl font-bold mb-7 text-center text-teal-900">
            Idea Board
          </h1>
        </div>

        <GlobalState.Provider value={{ state, setState }}>
          {/* New Idea Section */}
          <div className="mb-16">
            <AddNewIdea />
          </div>

          <div className="mb-5">
            <SortOptions />
          </div>

          {Object.keys(ideas).map((key) => (
            <div className="mb-5" key={key}>
              <IdeaCard idea={ideas[key]} />
            </div>
          ))}
        </GlobalState.Provider>
      </div>
    </div>
  );
};

export default App;
