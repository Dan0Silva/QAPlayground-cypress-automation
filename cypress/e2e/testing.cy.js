/// <reference types="cypress" />

describe("QA Playground testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Find the Spider-Man in a table that changes the order of rows and assert his real name", () => {
    cy.get('[href="/apps/dynamic-table/"] > .card-content').click();
    cy.dynamicTable();
  });

  it("Enter valid code by pressing the key-up button or typing number and assert success message", () => {
    cy.get('[href="/apps/verify-account/"] > .card-content').click();
    cy.vefiryAccount();
  });

  it("Add and remove tags and assert tag's presence and count", () => {
    cy.get('[href="/apps/tags-input-box/"] > .card-content').click();
    cy.tagInput();
  });

  it("Navigate into the sub-menus and assert menu items text and link", () => {
    cy.get('[href="/apps/multi-level-dropdown/"] > .card-content').click();
    cy.multiLevelDropdown();
  });
});
