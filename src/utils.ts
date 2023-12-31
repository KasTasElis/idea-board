import { TIdea } from "./components";
import { ESortingOptions } from "./state";

export const sortIdeas = (ideas: TIdea[], typeOfSort: ESortingOptions) => {
  switch (typeOfSort) {
    case ESortingOptions.A_Z:
    case ESortingOptions.Z_A:
      return sortIdeasAlphabeticallyByTitle(ideas, typeOfSort);
    case ESortingOptions.BY_DATE_ASCENDING:
    case ESortingOptions.BY_DATE_DESCENDING:
      return sortIdeasByDate(ideas, typeOfSort);
    default:
      return ideas;
  }
};

export const sortIdeasAlphabeticallyByTitle = (
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

export const sortIdeasByDate = (
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

export const createUpdatedIdeaObject = (
  ideaToUpdate: TIdea,
  {
    title,
    description,
    updatedAt,
  }: { title?: string; description?: string; updatedAt: number }
): TIdea => ({
  ...ideaToUpdate,
  title: title || ideaToUpdate.title,
  description: description || ideaToUpdate.description,
  updatedAt,
});

/* 
  @uuid
  Due to simplicity of this function i am ok with it's impurity. 
*/
export const uuid = () => Math.random().toString(36).substring(2, 9);

export const getFormattedIdeaDateString = (idea: TIdea) => {
  const relevantTimeStamp = idea.updatedAt || idea.createdAt;
  const relevantWord = idea.updatedAt ? "✍️ Updated" : "💡 Created";

  const date = new Date(relevantTimeStamp);
  const dateString = date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${relevantWord} @ ${dateString}`;
};
