## bank_transfer_schedule_valid.feature

Feature: Bank transfer payment with valid scheduled date

        As a legitimate user
        I want to make a scheduled payment by bank transfer
        So that I can be charged at a later date and be redirected to the confirmation page

        @transfer @boundary @date
        Scenario: Scheduled payment with a valid future date
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid payment information
                And they choose Scheduled payment
                And they enter a date of tomorrow
                And they click on "CONFIRMER LE VIREMENT"
                Then they are redirected to the confirmation page
                And no warning message is displayed
