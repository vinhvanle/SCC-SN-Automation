Feature: Article Lifecycle
    @demo
    Scenario Outline: <TestID>: Submit a new article by knowledge user
        Users:
        1. admin
        2. knowledge
        3. knowledge mananger
        4. knowledge admin

        Given <TestID>: As a "knowledge" user, I login to SN Dev Instance
        Then <TestID>: I navigate to "Create New Article"
        Then <TestID>: I open new article form
        Then <TestID>: I fill in mandatory fields and submit
        When <TestID>: I open the "article" record
        Then <TestID>: I can verify its "Version" field is "0.01"
        Then <TestID>: I can verify its "Workflow" field is "Draft"

        Examples:
            | TestID       | 
            | SN_DEV_TC001 |

    # Scenario Outline: Scenario Outline name
