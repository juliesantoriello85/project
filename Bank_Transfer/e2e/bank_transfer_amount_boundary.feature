## bank_transfer_amount_boundary.feature

Feature: Bank transfer payment validation for amount boundaries

        As a legitimate user
        I want boundary amount values to be accepted when valid
        So that the minimum and maximum allowed amounts are covered

        Background:
                Given the user with role "Admin" is on the payment page
                And they select the bank transfer option
                And they enter valid beneficiary
                And they enter valid IBAN
                And they enter valid label
                And they leave Instant payment selected

        @transfer @field-validation @boundary
        Scenario Outline: Boundary amount allows transfer
                When they enter the "<AmountType>" amount
                And they click on "CONFIRMER LE VIREMENT"
                Then no warning message is displayed
                And they are redirected to the confirmation page

                Examples:
                        | AmountType   |
                        | lowboundary  |
                        | highboundary |
