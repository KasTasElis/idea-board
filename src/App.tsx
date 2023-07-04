import { useMemo } from "react";
import {
  AddNewIdea,
  IdeaCard,
  SortOptions,
  TIdea,
  Notifications,
} from "./components";
import { useGlobalState } from "./state";

export enum ESortingOptions {
  BY_DATE_ASCENDING = "Oldest",
  BY_DATE_DESCENDING = "Latest",
  A_Z = "A-Z",
  Z_A = "Z-A",
}

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
  const { state } = useGlobalState();

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

  return (
    <div className="p-3">
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
      </div>
    </div>
  );
};

export default App;
