## bank_transfer_IBAN_invalid.feature

Feature: Bank transfer payment validation for invalid IBAN

        As a legitimate user
        I want to be prevented from submitting an invalid IBAN length
        So that invalid payments are not processed

        @transfer @field-validation @boundary
        Scenario: Invalid IBAN length prevents transfer
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid beneficiary
                And they enter the "invalid" IBAN
                And they enter valid label
                And they enter valid amount
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "erreur d IBAN" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page
