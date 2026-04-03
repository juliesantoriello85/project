## bank_transfer_schedule_invalid.feature

Feature: Bank transfer payment validation for invalid scheduled dates

        As a legitimate user
        I want to be prevented from scheduling payments outside allowed dates
        So that invalid payments are blocked

        Background:
                Given the user with role "Admin" is on the payment page
                And they select the bank transfer option
                And they enter valid payment information
                And they choose Scheduled payment

        @transfer @field-validation @boundary @date
        Scenario Outline: Scheduled payment with invalid date
                When they enter a "<dateType>" date
                And they click on "CONFIRMER LE VIREMENT"
                Then a warning message "date incorrecte" is displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page

                Examples:
                        | dateType            |
                        | past                |
                        | beyondAllowedFuture |
