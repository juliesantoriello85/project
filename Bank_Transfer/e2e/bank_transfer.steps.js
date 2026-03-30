import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { selectors } from "./bank_transfer.selectors";
import {
    amounts,
    emptyData,
    ibans,
    invalidData,
    invalidFormatData,
    validData,
} from "./bank_transfer.data";

// ======================================================
// 🔧 HELPERS
// ======================================================
// This uses toISOString() for simplicity.
// It is acceptable for this exercise because our CI does not run near date-boundary times,
// but a local-date formatter would be safer for long-term robustness.

const selectDate = (type) => {
    const today = new Date();

    if (type === "past") {
        today.setDate(today.getDate() - 1);
    }

    if (type === "beyondAllowedFuture") {
        today.setDate(today.getDate() + 91);
    }

    if (type === "tomorrow") {
        today.setDate(today.getDate() + 1);
    }

    const formatted = today.toISOString().split("T")[0];
    cy.get(selectors.datePicker).clear().type(formatted);
};

// ======================================================
// GIVEN
// ======================================================

Given("the user with role {string} is on the payment page", (role) => {
    cy.task("log", `Logging in with role ${role}`);
    cy.login(role);
    cy.visit("/payment");
});

// ======================================================
// WHEN
// ======================================================

When("they select the bank transfer option", () => {
    cy.task("log", "Selecting the bank transfer option");
    cy.get(selectors.bankTransfer).click();
});

When("they enter valid payment information", () => {
    cy.task("log", "Entering all valid payment information");
    cy.get(selectors.beneficiary).clear().type(validData.BeneficiaryName);
    cy.get(selectors.iban).clear().type(validData.IBAN);
    cy.get(selectors.label).clear().type(validData.Label);
    cy.get(selectors.amount).clear().type(validData.Amount);
});

When("they leave empty payment information", () => {
    cy.task("log", "Entering all valid payment information");
    cy.get(selectors.beneficiary).clear().type(emptyData.BeneficiaryName);
    cy.get(selectors.iban).clear().type(emptyData.IBAN);
    cy.get(selectors.label).clear().type(emptyData.Label);
    cy.get(selectors.amount).clear().type(emptyData.Amount);
});

When("they enter invalid {string} information", (field) => {
    const fieldMap = {
        BeneficiaryName: {
            selector: selectors.beneficiary,
            value: invalidData.BeneficiaryName,
        },
        IBAN: {
            selector: selectors.iban,
            value: invalidData.IBAN,
        },
        Label: {
            selector: selectors.label,
            value: invalidData.Label,
        },
        Amount: {
            selector: selectors.amount,
            value: invalidData.Amount,
        },
    };

    const targetField = fieldMap[field];
    if (!targetField) {
        throw new Error(`Unsupported field: ${field}`);
    }

    cy.task("log", `Entering invalid ${field} information`);
    cy.get(targetField.selector).clear().type(targetField.value);
});

When("they enter valid beneficiary", () => {
    cy.task("log", "Entering valid beneficiary information");
    cy.get(selectors.beneficiary).clear().type(validData.BeneficiaryName);
});

When("they enter valid IBAN", () => {
    cy.task("log", "Entering valid IBAN information");
    cy.get(selectors.iban).clear().type(validData.IBAN);
});

When("they enter the {string} IBAN", (ibanType) => {
    const iban = ibans[ibanType];

    if (!iban) {
        throw new Error(`Unsupported IBAN type: ${ibanType}`);
    }

    cy.task("log", `Entering the ${ibanType} IBAN`);
    cy.get(selectors.iban).clear().type(iban);
});

When("they enter valid label", () => {
    cy.task("log", "Entering valid label information");
    cy.get(selectors.label).clear().type(validData.Label);
});

When("they enter valid amount", () => {
    cy.task("log", "Entering valid amount information");
    cy.get(selectors.amount).clear().type(validData.Amount);
});

When("they enter the {string} amount", (amountType) => {
    const amount = amounts[amountType];

    if (!amount) {
        throw new Error(`Unsupported amount type: ${amountType}`);
    }

    cy.task("log", `Entering the ${amountType} amount`);
    cy.get(selectors.amount).clear().type(amount);
});

When("they enter invalid beneficiary", () => {
    cy.task("log", "Entering invalid beneficiary information");
    cy.get(selectors.beneficiary).clear().type(invalidData.BeneficiaryName);
});

When("they enter invalid IBAN", () => {
    cy.task("log", "Entering invalid IBAN information");
    cy.get(selectors.iban).clear().type(invalidData.IBAN);
});

When("they enter invalid label", () => {
    cy.task("log", "Entering invalid label information");
    cy.get(selectors.label).clear().type(invalidData.Label);
});

When("they enter a label with special characters", () => {
    cy.task("log", "Entering a label with special characters");
    cy.get(selectors.label).clear().type(invalidFormatData.Label);
});

When("they enter invalid amount", () => {
    cy.task("log", "Entering invalid amount information");
    cy.get(selectors.amount).clear().type(invalidData.Amount);
});

When("they leave Instant payment selected", () => {
    cy.task("log", "Leaving Instant payment selected");
    cy.get(selectors.instantPayment).should("be.checked");
});

When("they choose Scheduled payment", () => {
    cy.task("log", "Choosing Scheduled payment");
    cy.get(selectors.scheduledPayment).check();
});

When("they enter a {string} date", (dateType) => {
    cy.task("log", `Selecting a ${dateType} date`);
    selectDate(dateType);
});

When("they enter a date of tomorrow", () => {
    cy.task("log", "Selecting a date of tomorrow");
    selectDate("tomorrow");
});

When("they leave the scheduled date empty", () => {
    cy.task("log", "Leaving the scheduled date empty");
    cy.get(selectors.datePicker).clear();
});

When('they click on "CONFIRMER LE VIREMENT"', () => {
    cy.task("log", "Clicking on CONFIRMER LE VIREMENT");
    cy.get(selectors.confirmButton).click();
});

// ======================================================
// THEN — GENERIC ASSERTIONS
// ======================================================

Then("they are redirected to the confirmation page", () => {
    cy.task("log", "Checking if user is redirected to the confirmation page");
    cy.url().should("include", "/confirmation");
});

Then("they are not redirected to the confirmation page", () => {
    cy.task("log", "Checking if user is not redirected to the confirmation page");
    cy.url().should("not.include", "/confirmation");
});

Then("no warning message is displayed", () => {
    cy.task("log", "Checking if no warning message is displayed");
    cy.get(selectors.warningBeneficiaryName).should("not.exist");
    cy.get(selectors.warningIban).should("not.exist");
    cy.get(selectors.warningLabel).should("not.exist");
    cy.get(selectors.warningAmount).should("not.exist");
});

Then("a warning message {string} is displayed", (message) => {
    cy.task("log", `Checking if warning message "${message}" is displayed`);
    cy.contains(message).should("be.visible");
});

Then("all warning messages are displayed", () => {
    cy.task("log", "Checking that all warning messages are displayed");
    cy.get(selectors.warningBeneficiaryName).should("be.visible");
    cy.get(selectors.warningIban).should("be.visible");
    cy.get(selectors.warningLabel).should("be.visible");
    cy.get(selectors.warningAmount).should("be.visible");
});

Then('the button "CONFIRMER LE VIREMENT" is disabled', () => {
    cy.task("log", "Checking if the CONFIRMER LE VIREMENT button is disabled");
    cy.get(selectors.confirmButton).should("be.disabled");
});

// ======================================================
// THEN — RBAC (PARAMETERIZED)
// ======================================================

Then(
    'they are {string} redirected to the confirmation page',
    (redirect) => {
        if (redirect === "yes") {
            cy.task("log", "Checking if user is redirected to the confirmation page");
            cy.url().should("include", "/confirmation");
        } else {
            cy.task("log", "Checking if user is not redirected to the confirmation page");
            cy.url().should("not.include", "/confirmation");
        }
    }
);

Then(
    'the message "Your payment has been processed successfully." is {string} displayed',
    (message) => {
        if (message === "yes") {
            cy.task("log", "Checking if the success message is displayed");
            cy.contains(
                "Your payment has been processed successfully."
            ).should("be.visible");
        } else {
            cy.task("log", "Checking if the success message is not displayed");
            cy.contains(
                "Your payment has been processed successfully."
            ).should("not.exist");
        }
    }
);
