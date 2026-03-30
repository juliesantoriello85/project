# Bank Transfer QA Exercise

Behavior-Driven Development end-to-end test assets for a bank transfer flow using Cypress and Cucumber-style Gherkin scenarios.

This folder currently contains:
- bank transfer scenarios under `e2e/`
- shared Cypress step definitions and support commands
- test user fixtures for role-based login
- this README for the QA submission

## Project Scope

The main automated coverage in this project is focused on the bank transfer journey:
- role-based access control for bank transfer payments
- IBAN validation at valid boundaries and invalid length
- amount validation at valid boundaries and invalid over-limit value
- empty and invalid payment information
- scheduled payment validation for valid and invalid dates

## Structure

```text
hiring/
`-- QA/
    |-- Bank_Transfer/
    |   |-- e2e/
    |   |   |-- *.feature
    |   |   |-- bank_transfer.data.js
    |   |   |-- bank_transfer.selectors.js
    |   |   |-- bank_transfer.steps.js
    |   |   |-- fixtures/
    |   |   |   `-- userList.json
    |   |   `-- support/
    |   |       |-- commands.js
    |   |       `-- e2e.js
    |   `-- README.md
    |-- Socle_Login/
    |   |-- login_test.feature
    |   `-- login_test.js
    |-- Level-1-junior-to-confirmed.md
    `-- Level-2-beyond-confirmed.md
```

## Tags

Here are the tags used in this project:
@transfer @field-validation @boundary @rbac @date

- `@transfer`: identifies all scenarios related to the bank transfer flow.
- `@field-validation`: marks scenarios that validate form input rules and warning behavior.
- `@boundary`: marks scenarios that exercise minimum or maximum accepted values.
- `@rbac`: marks scenarios that validate authorization by role.
- `@date`: marks scenarios related to scheduled transfer date behavior.

## Coverage Matrix

| Rule / behavior | Covered by |
| --- | --- |
| Instant payment succeeds with valid data | `bank_transfer_instant_valid.feature` |
| Scheduled payment succeeds with tomorrow as date | `bank_transfer_schedule_valid.feature` |
| Unauthorized role cannot complete a transfer | `bank_transfer_RBAC.feature` |
| IBAN length boundaries 14 and 34 are accepted | `bank_transfer_IBAN_boundary.feature` |
| IBAN below minimum length is rejected | `bank_transfer_IBAN_invalid.feature` |
| Amount boundaries 0.01 and 100000 are accepted | `bank_transfer_amount_boundary.feature` |
| Amount above maximum is rejected | `bank_transfer_amount_invalid.feature` |
| Scheduled payment rejects missing or out-of-range dates | `bank_transfer_schedule_missing_date.feature`, `bank_transfer_schedule_invalid.feature` |
| Empty payment form is rejected | `bank_transfer_allInfo_empty.feature` |
| Invalid beneficiary, IBAN, label length, and amount are rejected | `bank_transfer_allInfo_invalid.feature` |
| Label special characters are rejected | `bank_transfer_label_special_chars_invalid.feature` |


## Running The Tests

This submission folder does not currently include a visible `package.json` or Cypress configuration file, so it appears to be a test module intended to live inside a larger Cypress project.

Run the suite from the actual project root that contains:
- the Cypress configuration
- the package manifest
- the required dependencies

Typical Cypress commands would be:

```bash
npx cypress open
npx cypress run
```

If this folder is intended to become a standalone project, the next setup step would be to add:
- `package.json`
- Cypress configuration
- `cypress-cucumber-preprocessor` configuration
- any required environment variables such as `baseUrl`

## Assumptions

These tests assume the target application provides:
- `/login` and `/payment` routes
- stable selectors for the payment form, preferably `data-cy` attributes where available
- role-specific users matching `e2e/fixtures/userList.json`
- a login form with `#username`, `#password`, and a submit button

## Extending The Suite

When adding new scenarios:
- keep business-readable behavior in `.feature` files
- reuse shared steps from `e2e/bank_transfer.steps.js` when possible
- define reusable test data in one central place instead of repeating raw values in multiple steps, for example in `e2e/bank_transfer.data.js`
- keep selectors in a dedicated module such as `e2e/bank_transfer.selectors.js`, preferring `data-cy` locators when available
- keep RBAC, validation, and scheduling concerns separated by feature

If a scenario needs isolated field coverage, prefer targeted steps such as:
- `they enter valid beneficiary`
- `they enter the "lowboundary" amount`
- `they enter the "highboundary" IBAN`

If a scenario is about end-to-end authorization or a happy path, prefer broader setup steps such as:
- `they enter valid payment information`

## Notes

- `Socle_Login` remains available as a small reference example for login scenarios and Cypress/Cucumber structure.
- Some feature files still mix English Gherkin with French UI messages, which is fine if it matches the product language, but consistency may be worth improving over time.
