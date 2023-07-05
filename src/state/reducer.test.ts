import { test, describe, expect } from "vitest";
import { addIdea, deleteIdea, editIdea } from "./reducer";
import { EActionTypes, initialState } from ".";
import { createIdeaObject } from "../components/AddNewIdea";
import { createUpdatedIdeaObject } from "../components";

test("creates a new idea object", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";

  const idea = createIdeaObject({
    title,
    description,
  });

  expect(idea.id).toBeDefined();
  expect(idea.createdAt).toBeDefined();
  expect(idea.updatedAt).not.toBeDefined();
  expect(idea.title).toBe(title);
  expect(idea.description).toBe(description);
});

test("creates an updated idea object", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";

  const idea = createIdeaObject({
    title,
    description,
  });

  const newTitle = "Say Hello World!";
  const newDescription = "Say hello to everybody in the world.";

  const updatedIdea = createUpdatedIdeaObject(idea, {
    title: newTitle,
    description: newDescription,
  });

  expect(updatedIdea.id).toBe(idea.id);
  expect(updatedIdea.updatedAt).toBeDefined();
  expect(updatedIdea.title).toBe(newTitle);
  expect(updatedIdea.description).toBe(newDescription);
});

describe("reducer", () => {
  test("adds an idea", () => {
    const newIdea = createIdeaObject({
      title: "Say Hello World!",
      description: "Lorem ipsum dolor sit amet...",
    });
    const action = {
      type: EActionTypes.ADD_IDEA as EActionTypes.ADD_IDEA, // huh???
      payload: newIdea,
    };
    const state = addIdea(initialState, action);

    expect(state.ideas.length).toBe(1);
    expect(state.ideas[0]).toEqual(newIdea);
  });

  test("deletes an idea", () => {
    const newIdeaOne = createIdeaObject({
      title: "Say Hello World!",
      description: "Lorem ipsum dolor sit amet...",
    });
    const newIdeaTwo = createIdeaObject({
      title: "Say Hello World!",
      description: "Lorem ipsum dolor sit amet...",
    });

    const initialStateWithAFewIdeas = {
      ...initialState,
      ideas: [newIdeaOne, newIdeaTwo],
    };

    expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

    const action = {
      type: EActionTypes.DELETE_IDEA as EActionTypes.DELETE_IDEA, // huh???
      payload: newIdeaOne,
    };
    const state = deleteIdea(initialStateWithAFewIdeas, action);

    expect(state.ideas.length).toBe(1);
    expect(state.ideas[0]).toEqual(newIdeaTwo);
  });

  // test("updates an idea", () => {
  //   const newIdeaOne = createIdeaObject({
  //     title: "Say Hello World!",
  //     description: "Lorem ipsum dolor sit amet...",
  //   });
  //   const newIdeaTwo = createIdeaObject({
  //     title: "Say Hello World!",
  //     description: "Lorem ipsum dolor sit amet...",
  //   });

  //   const initialStateWithAFewIdeas = {
  //     ...initialState,
  //     ideas: [newIdeaOne, newIdeaTwo],
  //   };

  //   expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

  //   const newTitle = "Say Hello World!";
  //   const newDescription = "Lorem ipsum dolor sit amet...";
  //   const updatedIdea = createUpdatedIdeaObject(newIdeaOne, {
  //     title: newTitle,
  //     description: newDescription,
  //   });

  //   const action = {
  //     type: EActionTypes.EDIT_IDEA as EActionTypes.EDIT_IDEA, // huh???
  //     payload: updatedIdea,
  //   };
  //   const state = editIdea(initialStateWithAFewIdeas, action);

  //   expect(state.ideas.length).toBe(2);
  //   //expect(state.ideas[0]).toEqual(newIdeaTwo);
  // });
});
