describe("Blogg app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Ivan Fuentes",
      username: "navita",
      password: "sudaka",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });
  it("front page can be opened", function () {
    cy.visit("");
    cy.contains("Log in to application");
    cy.get("form");
    cy.get("#username");
    cy.get("#password");
  });
  describe.only("Login", function () {
    it("user can login", function () {
      cy.get("#username").type("navita");
      cy.get("#password").type("sudaka");
      cy.get("#login-button").click();

      cy.contains("Ivan Fuentes logged in");
    });
    it("login fails with wrong password", function () {
      cy.contains("log in").click();
      cy.get("#username").type("navita");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Ivan Fuentes logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "navita", password: "sudaka" });
    });
    it("a new blog can be created", function () {
      cy.contains("show").click();
      cy.get("#title").type("a new test from cypress");
      cy.get("#author").type("Cypress env");
      cy.get("#url").type("www.cypress.cy");
      cy.get("#create-button").click();

      cy.contains("a new test from cypress");
    });
    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another blog cypress",
          author: "still cypress",
          url: "www.cycycy.cy",
        });
      });
      it("it can be liked with button", function () {
        cy.contains("another blog cypress").contains("show").click();
        cy.get(".likeButton").click();
        cy.get("#likes").contains(1);
      });
      it("it can be removed by user", function () {
        cy.contains("another blog cypress").contains("show").click();
        cy.contains("another blog cypress").contains("remove").click();

        cy.contains("another blog cypress").should("not.exist");
      });
    });
    describe("and several blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "again cypress",
          url: "cy.com",
          likes: 1,
        });
        cy.createBlog({
          title: "second blog",
          author: "again cypress",
          url: "cy.com",
          likes: 3,
        });
        cy.createBlog({
          title: "third blog",
          author: "again cypress",
          url: "cy.com",
          likes: 2,
        });
      });
      it("one of those can be removed", function () {
        cy.contains("second blog").contains("show").click();
        cy.contains("second blog").contains("remove").click();

        cy.contains("second blog").should("not.exist");
      });
      it("blogs are sorted from higher to lower likes", function () {
        cy.get(".blog").eq(0).should("contain", "second blog");
      });
      it("blogs are still sorted from higher to lower likes after hitting like button", function () {
        cy.get(".blog").eq(0).contains("show").click();
        cy.get(".blog").eq(1).contains("show").click();
        cy.get(".blog").eq(2).contains("show").click();

        cy.contains("third blog").contains("Like").click();
        cy.wait(3000);
        cy.contains("third blog").contains("Like").click();
        cy.wait(3000);
        cy.contains("third blog").contains("Like").click();
        cy.wait(3000);

        cy.get(".blog").eq(0).should("contain", "third blog");
      });
    });
    describe("another user is logged in", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "a blog from Ivan",
          author: "Ivan",
          url: "www.ivan.i",
        });
        const otherUser = {
          name: "Micaela Gomez",
          username: "micalg",
          password: "galaxia",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, otherUser);
      });
      it("another user can't see remove button from other user's post", function () {
        cy.get("#logout-button").click();
        cy.login({ username: "micalg", password: "galaxia" });
        cy.contains("a blog from Ivan").contains("show").click();
        cy.contains("a blog from Ivan").contains("remove").should("not.exist");
      });
    });
  });
});
/* 
      cy.contains("log in").click();
      cy.get("#username").type("navita");
      cy.get("#password").type("sudaka");
      cy.get("#login-button").click();

      cy.contains("Ivan Fuentes logged in");
      
      cy.contains("third blog")
          .contains("Like").click()
      */
