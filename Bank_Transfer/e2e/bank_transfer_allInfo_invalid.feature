## bank_transfer_allInfo_invalid.feature

Feature: Bank transfer payment validation for invalid information

        As a legitimate user
        I want to be prevented from submitting incorrect payment information
        So that invalid payments are not processed

        Background:
                Given the user with role "Admin" is on the payment page
                And they select the bank transfer option

        @transfer @field-validation
        Scenario Outline: Invalid payment information prevents transfer
                When they enter invalid "<field>" information
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "<warning>" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page

                Examples:
                        | field           | warning                |
                        | BeneficiaryName | erreur de bénéficiaire |
                        | IBAN            | erreur d IBAN          |
                        | Label           | erreur de libellé      |
                        | Amount          | erreur de montant      |
