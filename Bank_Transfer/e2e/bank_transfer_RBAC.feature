## bank_transfer_RBAC.feature

Feature: Bank transfer payment authorization by role

        As a user
        I want to make an instant payment by bank transfer
        So that I can receive the benefits of my purchase

        @transfer @rbac
        Scenario Outline: Bank transfer authorization based on role
                Given the user with role "<RBAC>" is on the payment page
                When they select the bank transfer option
                And they enter valid payment information
                And they leave Instant payment selected
                And they click on "CONFIRMER LE VIREMENT"
                Then they are "<redirect>" redirected to the confirmation page
                And the message "Your payment has been processed successfully." is "<message>" displayed

                Examples:
                        | RBAC            | redirect | message |
                        | Admin           | yes      | yes     |
                        | PurchaseManager | yes      | yes     |
                        | Guest           | no       | no      |
