## bank_transfer_IBAN_boundary.feature

Feature: Bank transfer payment validation for IBAN boundaries

        As a legitimate user
        I want boundary IBAN values to be accepted when valid
        So that the minimum and maximum allowed lengths are covered

        Background:
                Given the user with role "Admin" is on the payment page
                And they select the bank transfer option
                And they enter valid beneficiary
                And they enter valid label
                And they enter valid amount
                And they leave Instant payment selected

        @transfer @field-validation @boundary
        Scenario Outline: Boundary IBAN length allows transfer
                When they enter the "<IBANType>" IBAN
                And they click on "CONFIRMER LE VIREMENT"
                Then no warning message is displayed
                And they are redirected to the confirmation page

                Examples:
                        | IBANType     |
                        | lowboundary  |
                        | highboundary |
