## bank_transfer_schedule_missing_date.feature

Feature: Bank transfer payment validation for missing scheduled date

        As a legitimate user
        I want to be prevented from scheduling a payment without a transfer date
        So that invalid payments are blocked

        @transfer @field-validation @date
        Scenario: Scheduled payment without date prevents transfer
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid payment information
                And they choose Scheduled payment
                And they leave the scheduled date empty
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "date incorrecte" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page
