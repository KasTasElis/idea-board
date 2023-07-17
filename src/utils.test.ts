import { test, expect, describe } from "vitest";
import {
  createNotificationObject,
  createUpdatedIdeaObject,
  getFormattedIdeaDateString,
  sortIdeasAlphabeticallyByTitle,
  sortIdeasByDate,
  uuid,
} from "./utils";
import { ESortingOptions } from "./state";
import { TIdea } from "./components";

test("creates a unique ID string", () => {
  const uniqueIdOne = uuid();
  const uniqueIdTwo = uuid();

  expect(uniqueIdOne).not.toBe(uniqueIdTwo);
});

test("creates a new idea object", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";
  const id = uuid();
  const createdAt = Date.now();

  const idea: TIdea = {
    title,
    description,
    id,
    createdAt,
  };

  expect(idea.id).toBe(id);
  expect(idea.title).toBe(title);
  expect(idea.description).toBe(description);
  expect(idea.createdAt).toBe(createdAt);
  expect(idea.updatedAt).not.toBeDefined();
});

describe("updates idea object with", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";
  const id = uuid();
  const createdAt = Date.now();

  const idea: TIdea = {
    title,
    description,
    id,
    createdAt,
  };

  const newTitle = "Say Hello World!";
  const newDescription = "Say hello to everybody in the world.";

  test("a new title", () => {
    const updatedAt = Date.now();

    const updatedIdea = createUpdatedIdeaObject(idea, {
      title: newTitle,
      updatedAt,
    });

    expect(updatedIdea.id).toBe(idea.id);
    expect(updatedIdea.createdAt).toBe(createdAt);
    expect(updatedIdea.updatedAt).toBeDefined();
    expect(updatedIdea.title).toBe(newTitle);
    expect(updatedIdea.description).toBe(description); // old description remains
  });

  test("a new description", () => {
    const updatedAt = Date.now();

    const updatedIdea = createUpdatedIdeaObject(idea, {
      description: newDescription,
      updatedAt,
    });

    expect(updatedIdea.id).toBe(idea.id);
    expect(updatedIdea.updatedAt).toBe(updatedAt);
    expect(updatedIdea.createdAt).toBe(createdAt);
    expect(updatedIdea.title).toBe(title); // old title remains
    expect(updatedIdea.description).toBe(newDescription);
  });

  test("a new title and new description", () => {
    const updatedAt = Date.now();

    const updatedIdea = createUpdatedIdeaObject(idea, {
      title: newTitle,
      description: newDescription,
      updatedAt,
    });

    expect(updatedIdea.id).toBe(idea.id);
    expect(updatedIdea.updatedAt).toBe(updatedAt);
    expect(updatedIdea.createdAt).toBe(createdAt);
    expect(updatedIdea.title).toBe(newTitle);
    expect(updatedIdea.description).toBe(newDescription);
  });
});

test("creates a new notification object", () => {
  const message = "Say Hello World!";
  const id = uuid();

  const notification = createNotificationObject(message, id);

  expect(notification.message).toBe(message);
  expect(notification.id).toBe(id);
});

// need a better test here
describe("returns correctly formatted date string for", () => {
  const title = "Say Hello";
  const description = "Say hello to everybody.";
  const id = uuid();
  const createdAt = Date.now();

  const idea: TIdea = {
    title,
    description,
    id,
    createdAt,
  };

  test("new idea", () => {
    const createdAtString = getFormattedIdeaDateString(idea);

    expect(createdAtString).not.toContain("Updated");
    expect(createdAtString).toContain("Created");
  });

  test("updated idea", () => {
    const newTitle = "Say Hello World!";
    const newDescription = "Say hello to everybody in the world.";
    const updatedAt = Date.now();

    const updatedIdea = createUpdatedIdeaObject(idea, {
      title: newTitle,
      description: newDescription,
      updatedAt,
    });

    const updatedAtString = getFormattedIdeaDateString(updatedIdea);

    expect(updatedAtString).not.toContain("Created");
    expect(updatedAtString).toContain("Updated");
  });
});

describe("sorts ideas alphabetically by title", () => {
  const ideas: TIdea[] = [
    {
      title: "ZAAA",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now(),
    },
    {
      title: "BAAA",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now() + 1000 * 60 * 3,
    },
    {
      title: "ABBB",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now() + 1000 * 60 * 7,
    },
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

describe("sorts ideas by date", () => {
  const ideas: TIdea[] = [
    {
      title: "ZAAA",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now(),
    },
    {
      title: "BAAA",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now() + 20000,
    },
    {
      title: "ABBB",
      description: "AAAA",
      id: uuid(),
      createdAt: Date.now() + 10000,
    },
  ];

  test("ascending", () => {
    const sortedIdeasArr = sortIdeasByDate(
      ideas,
      ESortingOptions.BY_DATE_ASCENDING
    );

    expect(sortedIdeasArr[0].title).toBe("ZAAA");
    expect(sortedIdeasArr[1].title).toBe("ABBB");
    expect(sortedIdeasArr[2].title).toBe("BAAA");
  });

  test("descending", () => {
    const sortedIdeasArr = sortIdeasByDate(
      ideas,
      ESortingOptions.BY_DATE_DESCENDING
    );

    expect(sortedIdeasArr[2].title).toBe("ZAAA");
    expect(sortedIdeasArr[1].title).toBe("ABBB");
    expect(sortedIdeasArr[0].title).toBe("BAAA");
  });
});
