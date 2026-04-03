## bank_transfer_label_special_chars_invalid.feature

Feature: Bank transfer payment validation for labels with special characters

        As a legitimate user
        I want to be prevented from submitting a label with special characters
        So that invalid payments are not processed

        @transfer @field-validation
        Scenario: Label with special characters prevents transfer
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid beneficiary
                And they enter valid IBAN
                And they enter a label with special characters
                And they enter valid amount
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "erreur de libellé" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page
