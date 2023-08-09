import {
  AddNewIdea,
  IdeaCard,
  SortOptions,
  Notifications,
  DevTools,
} from "./components";
import { useGlobalState } from "./state";

export enum ESortingOptions {
  BY_DATE_ASCENDING = "Oldest",
  BY_DATE_DESCENDING = "Latest",
  A_Z = "A-Z",
  Z_A = "Z-A",
}

const App = () => {
  const {
    state: { ideas },
  } = useGlobalState();

  return (
    <div className="p-3">
      <div className="mb-10">
        <DevTools />
      </div>

      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col justify-center text-center gap-2">
          <div className="text-5xl">🤔</div>
          <h1 className="text-3xl font-bold mb-7 text-center text-teal-900">
            Idea Board
          </h1>
        </div>

        <Notifications />

        <div className="mb-16">
          <AddNewIdea />
        </div>

        {ideas.length ? (
          <>
            <div className="mb-5">
              <SortOptions />
            </div>

            <ul>
              {ideas.map((idea) => (
                <li className="mb-5" key={idea.id}>
                  <IdeaCard idea={idea} />
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default App;
