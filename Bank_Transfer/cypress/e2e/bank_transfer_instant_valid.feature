## bank_transfer_instant_valid.feature

Feature: Bank transfer payment with valid instant mode

        As a legitimate user
        I want to make an instant payment by bank transfer
        So that I can be charged immediately and be redirected to the confirmation page

        @transfer
        Scenario: Instant payment with valid information
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they enter valid payment information
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then they are redirected to the confirmation page
                And no warning message is displayed
