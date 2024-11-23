import "@4tw/cypress-drag-drop";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("dynamicTable", () => {
  // Verifica se a tabela retornou todos os itens esperados (8 itens ao todo)
  cy.get("tbody > tr").should("have.length", "8");

  let foundPeterParker = false;

  // Selecionar cada linha da tabela
  cy.get("tbody > tr")
    .each(($tr) => {
      cy.wrap($tr).within(($element) => {
        // Selecionar o ultimo campo da linha (Real name)
        cy.wrap($element)
          .find("td")
          .eq(2)
          .invoke("text")
          .then((text) => {
            // Salva se algum dos textos contem "Peter Parker"
            if (text.trim() === "Peter Parker") {
              foundPeterParker = true;
            }
          });
      });
    })
    .then(() => {
      // Verifica se algum dos textos contem "Peter Parker"
      expect(foundPeterParker).to.be.true;
    });
});

Cypress.Commands.add("vefiryAccount", () => {
  // Preencher todos os campos
  cy.get(".code-container > input").each((item) => {
    cy.get(item).type("9");
  });

  // Verificar sucesso
  cy.get("small[class='info success']").should("be.visible");
});

Cypress.Commands.add("tagInput", () => {
  const wordList = [
    "remind",
    "master",
    "javascript",
    "golang",
    "ninja",
    "vision pro",
    "123 trip now",
    "java",
    "male",
    "strongs",
    "not tag",
  ];

  // Limpar tags
  cy.get(".details > button").click();

  // Adicionar todas as tags
  wordList.forEach((item) =>
    cy.get(".content > ul > input").type(item).type("{enter}")
  );

  // Verificar capacidade maxima
  cy.get("ul > li").should("have.length", 10);
});

Cypress.Commands.add("multiLevelDropdown", () => {
  // Setando estrutura esperada do dropdown
  const dropdown = {
    myProfile: null,
    settings: {
      tittle: "My Tutorial",
      options: ["HTML", "CSS", "JavaScript", "Awesome!"],
    },
    animals: {
      tittle: "Animals",
      options: ["Kangaroo", "Frog", "Horse", "Hedgehog"],
    },
  };

  // Abrir menu
  cy.get(":nth-child(4) > a.icon-button").click();

  // Selecionar contexto do dropdown
  cy.get(".dropdown").within(($dropdown) => {
    // Verificar primeiro nivel do modal
    cy.wrap($dropdown)
      .get("[href='#undefined']")
      .should("have.text", "My Profile");
    cy.wrap($dropdown)
      .get("[href='#settings']")
      .should("have.text", "Settings");
    cy.wrap($dropdown)
      .get("[href='#animals']")
      .should("contain.text", "Animals");

    // Verificar segundo nivel - settings
    cy.wrap($dropdown).get("[href='#settings']").click();
    cy.get("[href='#main']").should("contain.text", dropdown.settings.tittle);
    cy.get("a[href='#!HTML']").should(
      "contain.text",
      dropdown.settings.options[0]
    );
    cy.get("a[href='#!CSS']").should(
      "contain.text",
      dropdown.settings.options[1]
    );
    cy.get("a[href='#!JavaScript']").should(
      "contain.text",
      dropdown.settings.options[2]
    );
    cy.get("a[href='#!Awesome']").should(
      "contain.text",
      dropdown.settings.options[3]
    );

    // Voltar para o primeiro nivel
    cy.get("a[href='#main']").click();

    // Verificar segundo nivel - animals
    cy.wrap($dropdown).get("[href='#animals']").click();
    cy.get("[href='#main']").should("contain.text", dropdown.animals.tittle);
    cy.get("a[href='#!Kangaroo']").should(
      "contain.text",
      dropdown.animals.options[0]
    );
    cy.get("a[href='#!Frog']").should(
      "contain.text",
      dropdown.animals.options[1]
    );
    cy.get("a[href='#!Horse']").should(
      "contain.text",
      dropdown.animals.options[2]
    );
    cy.get("a[href='#!Hedgehog']").should(
      "contain.text",
      dropdown.animals.options[3]
    );

    // Voltar para o primeiro nivel
    cy.get("[href='#main']").eq(0).click();
  });

  // Verificar se o dropdown sumiu
  cy.get(":nth-child(4) > a.icon-button").click();
  cy.get(".dropdown").should("not.exist");
});

Cypress.Commands.add("sortableList", () => {
  /**
   * skip for now
   *
   */

  cy.get("li > div > p").contains("Jeff Bezos").drag('[data-index="0"]');
  cy.get("#check").click();

  cy.contains("Bill Gates").drag('[data-index="1"]');
});

Cypress.Commands.add("newTab", () => {
  cy.get("#open").invoke("removeAttr", "target").click();
  cy.get("h1").should("have.text", "Welcome to the new page!");
});
