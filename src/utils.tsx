import { TIdea } from "./components";
import { ESortingOptions } from "./state";

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
