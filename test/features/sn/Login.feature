Feature: Article Lifecycle
    @demo
    Scenario Outline: <TestID>: Submit a new article by knowledge user
        Users:
        1. admin
        2. knowledge
        3. knowledge mananger
        4. knowledge admin

        Given As a "knowledge" user, I login to SN Dev Instance
        Then I navigate to "Create New Article"
        Then I open new article form
        Then I fill in mandatory fields and submit

        Examples:
            | TestID       | 
            | SN_DEV_TC001 |


