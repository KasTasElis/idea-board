import { test } from "vitest";

test("Say hello world", () => {
  console.log("Hello world!");
});

// import { addIdea, deleteIdea, editIdea } from "./reducer";
// import { EActionTypes, initialState } from ".";
// // import { createIdeaObject } from "../components/AddNewIdea";
// // import { createUpdatedIdeaObject } from "../components";

// describe("reducer", () => {
//   test("adds an idea", () => {
//     const newIdea = createIdeaObject({
//       title: "Say Hello World!",
//       description: "Lorem ipsum dolor sit amet...",
//     });
//     const action = {
//       type: EActionTypes.ADD_IDEA as EActionTypes.ADD_IDEA, // huh???
//       payload: newIdea,
//     };
//     const state = addIdea(initialState, action);

//     expect(state.ideas.length).toBe(1);
//     expect(state.ideas[0]).toEqual(newIdea);
//   });

//   test("deletes an idea", () => {
//     const newIdeaOne = createIdeaObject({
//       title: "Say Hello World!",
//       description: "Lorem ipsum dolor sit amet...",
//     });
//     const newIdeaTwo = createIdeaObject({
//       title: "Say Hello World!",
//       description: "Lorem ipsum dolor sit amet...",
//     });

//     const initialStateWithAFewIdeas = {
//       ...initialState,
//       ideas: [newIdeaOne, newIdeaTwo],
//     };

//     expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

//     const action = {
//       type: EActionTypes.DELETE_IDEA as EActionTypes.DELETE_IDEA, // huh???
//       payload: newIdeaOne,
//     };
//     const state = deleteIdea(initialStateWithAFewIdeas, action);

//     expect(state.ideas.length).toBe(1);
//     expect(state.ideas[0]).toEqual(newIdeaTwo);
//   });

//   // test("updates an idea", () => {
//   //   const newIdeaOne = createIdeaObject({
//   //     title: "Say Hello World!",
//   //     description: "Lorem ipsum dolor sit amet...",
//   //   });
//   //   const newIdeaTwo = createIdeaObject({
//   //     title: "Say Hello World!",
//   //     description: "Lorem ipsum dolor sit amet...",
//   //   });

//   //   const initialStateWithAFewIdeas = {
//   //     ...initialState,
//   //     ideas: [newIdeaOne, newIdeaTwo],
//   //   };

//   //   expect(initialStateWithAFewIdeas.ideas.length).toBe(2);

//   //   const newTitle = "Say Hello World!";
//   //   const newDescription = "Lorem ipsum dolor sit amet...";
//   //   const updatedIdea = createUpdatedIdeaObject(newIdeaOne, {
//   //     title: newTitle,
//   //     description: newDescription,
//   //   });

//   //   const action = {
//   //     type: EActionTypes.EDIT_IDEA as EActionTypes.EDIT_IDEA, // huh???
//   //     payload: updatedIdea,
//   //   };
//   //   const state = editIdea(initialStateWithAFewIdeas, action);

//   //   expect(state.ideas.length).toBe(2);
//   //   //expect(state.ideas[0]).toEqual(newIdeaTwo);
//   // });
// });
