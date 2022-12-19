describe("burger constructor tests", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
            fixture: "ingredients.json",
        });

        cy.get('[data-test="ingredient"]').as("ingredient");
        cy.get('[data-test="constructor"]').as("constructor");
        cy.get('[data-test="price"]').as("price");
    });

    it("should drag and drop ingredients", function () {
        cy.get("@ingredient").eq(0).trigger("dragstart"); //check bun
        cy.get("@constructor").trigger("drop");

        cy.get("@price").find('p').should("have.text", 2510);

        cy.get("@ingredient").eq(5).trigger("dragstart"); //check not bun
        cy.get("@constructor").trigger("drop");

        cy.get("@price").find('p').should("have.text", 2934); 

        cy.get("@ingredient").eq(0).find(".counter__num").should("have.text", 2);
        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 1);
    });

    it("should remove ingredients", function () {
        // довляю два одинаковых элемента
        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        cy.get("@ingredient").eq(5).trigger("dragstart");
        cy.get("@constructor").trigger("drop");

        // проверяю изменился ли счетчик
        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 2);
        cy.get("[data-test=constructor-ingredient]").should("have.length", 2);

        cy.get("@price").find('p').should("have.text", 848); //проверяю цену

        cy.get("[data-test=constructor-ingredient]")
            .eq(1)
            .find(".constructor-element__action")
            .click(); // клик по кнопке удалить

        cy.get("@ingredient").eq(5).find(".counter__num").should("have.text", 1); // проверяю счестчик
        cy.get("[data-test=constructor-ingredient]").should("have.length", 1); //проверяю количество элементов в конструкторе
        cy.get("@price").find('p').should("have.text", 424); //проверяю цену
    });
});
