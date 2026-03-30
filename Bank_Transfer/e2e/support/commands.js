Cypress.Commands.add("login", (role) => {
    cy.fixture("userList").then((users) => {
        const user = users[role];

        if (!user) {
            throw new Error(`Unsupported role: ${role}`);
        }

        if (!user.email || !user.password) {
            throw new Error(
                `Missing email or password for role: ${role} in fixtures/userList.json`
            );
        }

        cy.visit("/login");
        cy.get("#username").type(user.email);
        cy.get("#password").type(user.password);
        cy.get("button[type='submit']").click();
    });
});
