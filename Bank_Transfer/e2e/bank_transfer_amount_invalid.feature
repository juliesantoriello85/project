## bank_transfer_amount_invalid.feature

Feature: Bank transfer payment validation for invalid amount

        As a legitimate user
        I want to be prevented from submitting an invalid amount
        So that invalid payments are not processed

        @transfer @field-validation
        Scenario: Amount above the maximum prevents transfer
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid beneficiary
                And they enter valid IBAN
                And they enter valid label
                And they enter the "invalid" amount
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "erreur de montant" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page
