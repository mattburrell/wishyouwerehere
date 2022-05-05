describe("App", function () {
    beforeEach(function () {
        
      });

      it("successfully loads", () => {
        cy.visit("http://localhost:8888/");
        cy.mockGeolocation(51.5, -1.2);
      })
});