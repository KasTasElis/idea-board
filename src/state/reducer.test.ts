import { test, describe, expect } from "vitest";
import { addIdea } from "./reducer";
import { EActionTypes, initialState } from ".";
import { createIdeaObject } from "../components/AddNewIdea";

describe("reducer", () => {
  test("can add an idea", () => {
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
});
