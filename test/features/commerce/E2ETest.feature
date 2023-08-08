Feature: Customer search
    # @demo
    Scenario Outline: <TestID>: Searh external customers
        Given Get list of users from reqres.in
        When As an admin user login to nocomerce site
        # When Search users in customer list
        Then Verify if all users exist in customers list

        Examples:
            | TestID    |
            | E2E_TC001 |


