## bank_transfer_allInfo_empty.feature

Feature: Bank transfer payment validation for empty information

        As a legitimate user
        I want to be prevented from submitting empty payment information
        So that invalid payments are not processed

        @transfer @field-validation
        Scenario: Empty payment information prevents transfer
                Given the user with role "Admin" is on the payment page
                When they select the bank transfer option
                And they leave empty payment information
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then all warning messages are displayed
                And the button "CONFIRMER LE VIREMENT" is disabled
                And they are not redirected to the confirmation page

