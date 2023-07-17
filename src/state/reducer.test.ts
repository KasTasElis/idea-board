import { test, describe, expect } from "vitest";

import {
  addIdea,
  deleteIdea,
  deleteNotification,
  editIdea,
  setIdeaSortingOption,
  setIdeas,
  showNotification,
} from "./reducer";
import {
  EActionTypes,
  ESortingOptions,
  TIdea,
  TNotification,
  initialState,
} from ".";
import { createUpdatedIdeaObject, uuid } from "../utils";
import { mockIdeas } from "../consts";

test("sets ideas array", () => {
  const action = {
    type: EActionTypes.SET_IDEAS as EActionTypes.SET_IDEAS, // huh???
    payload: mockIdeas as TIdea[],
  };

  const state = setIdeas(initialState, action);

  expect(state.ideas.length).toBe(mockIdeas.length);
});

test("adds an idea", () => {
  const newIdea: TIdea = {
    title: "Say Hello World!",
    description: "Lorem ipsum dolor sit amet...",
    id: uuid(),
    createdAt: Date.now(),
  };

  const action = {
    type: EActionTypes.ADD_IDEA as EActionTypes.ADD_IDEA, // huh???
    payload: newIdea,
  };

  const state = addIdea(initialState, action);

  expect(state.ideas.length).toBe(1);
  expect(state.ideas[0]).toEqual(newIdea);
});

test("deletes an idea", () => {
  const newIdeaOne: TIdea = {
    title: "Say Hello World!",
    description: "Lorem ipsum dolor sit amet...",
    id: uuid(),
    createdAt: Date.now(),
  };
  const newIdeaTwo: TIdea = {
    title: "Say Hello World!",
    description: "Lorem ipsum dolor sit amet...",
    id: uuid(),
    createdAt: Date.now() + 1000 * 60 * 60,
  };

  const initialStateWithAFewIdeas = {
    ...initialState,
    ideas: [newIdeaOne, newIdeaTwo],
  };

  expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

  const firstDeleteAction = {
    type: EActionTypes.DELETE_IDEA as EActionTypes.DELETE_IDEA, // huh???
    payload: newIdeaOne,
  };

  const stateAfterFirstDeletion = deleteIdea(
    initialStateWithAFewIdeas,
    firstDeleteAction
  );

  expect(stateAfterFirstDeletion.ideas.length).toBe(1);
  expect(stateAfterFirstDeletion.ideas[0]).toEqual(newIdeaTwo);

  const secondDeleteAction = {
    type: EActionTypes.DELETE_IDEA as EActionTypes.DELETE_IDEA, // huh???
    payload: newIdeaTwo,
  };

  const stateAfterSecondDeletion = deleteIdea(
    stateAfterFirstDeletion,
    secondDeleteAction
  );

  expect(stateAfterSecondDeletion.ideas.length).toBe(0);
});

describe("updates idea", () => {
  const newIdeaOne: TIdea = {
    title: "Say Hello World!",
    description: "Lorem ipsum dolor sit amet...",
    id: uuid(),
    createdAt: Date.now(),
  };
  const newIdeaTwo: TIdea = {
    title: "Say Hello World!",
    description: "Lorem ipsum dolor sit amet...",
    id: uuid(),
    createdAt: Date.now() + 1000 * 60 * 60,
  };

  const initialStateWithAFewIdeas = {
    ...initialState,
    ideas: [newIdeaOne, newIdeaTwo],
  };

  expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

  const newTitle = "Say Hello World!";
  const newDescription = "Lorem ipsum dolor sit amet...";

  test("title only", () => {
    const updatedIdea = createUpdatedIdeaObject(newIdeaOne, {
      title: newTitle,
      updatedAt: Date.now() + 1000 * 60 * 60,
    });

    const action = {
      type: EActionTypes.EDIT_IDEA as EActionTypes.EDIT_IDEA, // huh???
      payload: updatedIdea,
    };

    const state = editIdea(initialStateWithAFewIdeas, action);

    expect(state.ideas.length).toBe(2);
    expect(state.ideas[0].title).toBe(newTitle);
    expect(state.ideas[0].description).toBe(newIdeaOne.description);
  });

  test("description only", () => {
    const updatedIdea = createUpdatedIdeaObject(newIdeaOne, {
      description: newDescription,
      updatedAt: Date.now() + 1000 * 60 * 60,
    });

    const action = {
      type: EActionTypes.EDIT_IDEA as EActionTypes.EDIT_IDEA, // huh???
      payload: updatedIdea,
    };

    const state = editIdea(initialStateWithAFewIdeas, action);

    expect(state.ideas.length).toBe(2);
    expect(state.ideas[0].title).toBe(newIdeaOne.title);
    expect(state.ideas[0].description).toBe(newDescription);
  });

  test("description and title", () => {
    const updatedIdea = createUpdatedIdeaObject(newIdeaOne, {
      description: newDescription,
      title: newTitle,
      updatedAt: Date.now() + 1000 * 60 * 60,
    });

    const action = {
      type: EActionTypes.EDIT_IDEA as EActionTypes.EDIT_IDEA, // huh???
      payload: updatedIdea,
    };

    const state = editIdea(initialStateWithAFewIdeas, action);

    expect(state.ideas.length).toBe(2);
    expect(state.ideas[0].title).toBe(newTitle);
    expect(state.ideas[0].description).toBe(newDescription);
  });
});

describe("notification", () => {
  const notification: TNotification = {
    message: "Hello World!",
    id: uuid(),
  };

  test("adds", () => {
    const action = {
      type: EActionTypes.SHOW_NOTIFICATION as EActionTypes.SHOW_NOTIFICATION, // huh???
      payload: notification,
    };

    const state = showNotification(initialState, action);

    expect(state.notifications.length).toBe(1);
    expect(state.notifications[0].message).toBe(notification.message);
    expect(state.notifications[0].id).toBe(notification.id);
  });

  test("deletes", () => {
    const action = {
      type: EActionTypes.DELETE_NOTIFICATION as EActionTypes.DELETE_NOTIFICATION, // huh???
      payload: notification,
    };

    const state = deleteNotification(initialState, action);

    expect(state.notifications.length).toBe(0);
  });
});

test("sets sorting option", () => {
  expect(initialState.ideaSorting).toBe(ESortingOptions.BY_DATE_DESCENDING);

  const action = {
    type: EActionTypes.SET_IDEA_SORTING_OPTION as EActionTypes.SET_IDEA_SORTING_OPTION, // huh???
    payload: ESortingOptions.A_Z,
  };

  const state = setIdeaSortingOption(initialState, action);

  expect(state.ideaSorting).toBe(ESortingOptions.A_Z);
});
