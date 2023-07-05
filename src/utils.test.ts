import { test, expect, describe } from "vitest";
import {
  createIdeaObject,
  createNotificationObject,
  createUpdatedIdeaObject,
  getFormattedIdeaDateString,
  sortIdeasAlphabeticallyByTitle,
} from "./utils";
import { ESortingOptions } from "./state";

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

test("creates a new notification object", () => {
  const message = "Say Hello World!";

  const notification = createNotificationObject(message);

  expect(notification.id).toBeDefined();
  expect(notification.message).toBe(message);
});

// need a better test here
describe("returns correctly formatted date string for", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";

  const idea = createIdeaObject({
    title,
    description,
  });

  test("new idea", () => {
    const createdAtString = getFormattedIdeaDateString(idea);

    expect(createdAtString).not.toContain("Updated");
    expect(createdAtString).toContain("Created");
  });

  test("updated idea", () => {
    const newTitle = "Say Hello World!";
    const newDescription = "Say hello to everybody in the world.";

    const updatedIdea = createUpdatedIdeaObject(idea, {
      title: newTitle,
      description: newDescription,
    });

    const updatedAtString = getFormattedIdeaDateString(updatedIdea);

    expect(updatedAtString).not.toContain("Created");
    expect(updatedAtString).toContain("Updated");
  });
});

describe("sorts ideas alphabetically by title", () => {
  const ideas = [
    createIdeaObject({ title: "ZAAA", description: "AAAA" }),
    createIdeaObject({ title: "BAAA", description: "AAAA" }),
    createIdeaObject({ title: "ABBB", description: "AAAA" }),
  ];

  test("ascending", () => {
    const sortedIdeasArr = sortIdeasAlphabeticallyByTitle(
      ideas,
      ESortingOptions.A_Z
    );

    expect(sortedIdeasArr[0].title).toBe("ABBB");
    expect(sortedIdeasArr[1].title).toBe("BAAA");
    expect(sortedIdeasArr[2].title).toBe("ZAAA");
  });

  test("descending", () => {
    const sortedIdeasArr = sortIdeasAlphabeticallyByTitle(
      ideas,
      ESortingOptions.Z_A
    );

    expect(sortedIdeasArr[2].title).toBe("ABBB");
    expect(sortedIdeasArr[1].title).toBe("BAAA");
    expect(sortedIdeasArr[0].title).toBe("ZAAA");
  });
});
