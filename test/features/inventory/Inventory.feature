Feature: Inventory App feature
    @demo
    Scenario Outline: Inventory app scenario
        Given As a standard user I login to inventory web app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        
        

