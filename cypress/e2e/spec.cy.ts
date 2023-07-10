const createIdea = ({ title, description }) => {
  cy.contains("Add New Idea").click();

  cy.focused().should("have.attr", "placeholder", "Enter Title...");

  cy.get('input[placeholder="Enter Title..."]').type(title);

  cy.get('textarea[placeholder="Enter Description..."]').type(description);

  cy.contains("Submit").click();

  // form hides on submit
  cy.get('input[placeholder="Enter Title..."]').should("not.exist");

  // add idea button is visible again
  cy.contains("Add New Idea");

  // new idea is visible
  cy.contains(title);
  cy.contains(description);
  cy.contains(title).siblings().contains("Created @");
};

describe("idea board", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173");
  });

  it("form input fields display character count down", () => {
    cy.contains("Add New Idea").click();

    cy.contains("Title").siblings().contains("0/60");

    const title = "Hello";
    cy.get('input[placeholder="Enter Title..."]').type(title);

    cy.contains("Title").siblings().contains(`${title.length}/60`);

    cy.contains("Description").siblings().contains("0/160");

    const description = "Hello World";
    cy.get('textarea[placeholder="Enter Description..."]').type(description);

    cy.contains("Description").siblings().contains(`${description.length}/160`);
  });

  it("can create ideas", () => {
    const ideaOne = {
      title: "Learn to say hello!",
      description: "One day I will learn to say hello in 10 languages.",
    };

    createIdea(ideaOne);

    const ideaTwo = {
      title: "Learn to say goodbye!",
      description: "One day I will learn to say goodbye in 10 languages.",
    };

    createIdea(ideaTwo);
  });

  it("can edit ideas", () => {
    const ideaOne = {
      title: "Learn to say hello!",
      description: "One day I will learn to say hello in 10 languages.",
    };

    createIdea(ideaOne);

    const ideaTwo = {
      title: "Learn to say goodbye!",
      description: "One day I will learn to say goodbye in 10 languages.",
    };

    createIdea(ideaTwo);

    cy.contains(ideaOne.title).siblings().contains("Edit").click();

    cy.focused().should("have.attr", "value", ideaOne.title);

    const newTitle = "Learn to say Hey Hey Hey!";
    cy.get(`input[value="${ideaOne.title}"]`)
      .should("be.visible")
      .clear()
      .type(newTitle);

    cy.contains("Submit").click();

    // unobtrusive notification displays on edit
    cy.contains("Idea edited successfully!");

    // form hides on submit
    cy.get(`input[value="${ideaOne.title}"]`).should("not.exist");

    // changed from created to updated
    cy.contains(newTitle).siblings().contains("Updated @");
  });

  it("can delete ideas", () => {
    const ideaOne = {
      title: "Learn to say hello!",
      description: "One day I will learn to say hello in 10 languages.",
    };

    createIdea(ideaOne);

    const ideaTwo = {
      title: "Learn to say goodbye!",
      description: "One day I will learn to say goodbye in 10 languages.",
    };

    createIdea(ideaTwo);

    cy.contains(ideaOne.title).siblings().contains("Delete").click();

    cy.contains(ideaOne.title).should("not.exist");
    cy.contains(ideaTwo.title).should("exist");

    cy.contains(ideaTwo.title).siblings().contains("Delete").click();

    cy.contains(ideaTwo.title).should("not.exist");
  });

  it("persists state on window reload", () => {
    const ideaOne = {
      title: "Learn to say hello!",
      description: "One day I will learn to say hello in 10 languages.",
    };

    const ideaTwo = {
      title: "Learn to say goodbye!",
      description: "One day I will learn to say goodbye in 10 languages.",
    };

    createIdea(ideaOne);
    createIdea(ideaTwo);

    cy.reload();

    cy.contains(ideaOne.title);
    cy.contains(ideaOne.description);
    cy.contains(ideaTwo.title);
    cy.contains(ideaTwo.description);
  });

  it("can sort ideas by latest created or edited date", () => {
    cy.contains("Hydrate").click();

    cy.get("#idea-container").children().first().contains("Consectetur");
    cy.get("#idea-container").children().last().contains("Lorem Ipsum");
  });

  it("can sort ideas by oldest created or edited date", () => {
    cy.contains("Hydrate").click();

    cy.contains("Oldest").click();

    cy.get("#idea-container").children().first().contains("Lorem Ipsum");
    cy.get("#idea-container").children().last().contains("Consectetur");
  });

  it("can sort ideas alphabetically A to Z", () => {
    cy.contains("Hydrate").click();

    cy.contains("A-Z").click();

    cy.get("#idea-container").children().first().contains("Adolor Sitamet");
    cy.get("#idea-container").children().last().contains("Lorem Ipsum");
  });

  it("can sort ideas alphabetically Z to A", () => {
    cy.contains("Hydrate").click();

    cy.contains("Z-A").click();

    cy.get("#idea-container").children().first().contains("Lorem Ipsum");
    cy.get("#idea-container").children().last().contains("Adolor Sitamet");
  });
});
