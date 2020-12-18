Feature: Feature name

    Feature Description: Scenario name
    Background: Background name

    Scenario: Scenario name
        Given Mongodb is connected
        # And Find info in Blog collection with
        #     | title | author      | body      |
        #     | B     | Nghia Huynh | It's test |
        And "Blog" collections are empty
        And Create data Blog collection based on "blog-template.json"
            | title | author      | body      | hidden |
            | B     | Nghia Huynh | It's test | false  |
            | C     | Tinh Huynh  | It's test | true   |
        And Update data "Blog" collection based on
            | conditions    | dataUpdate    |
            | {"title":"C"} | {"title":"D"} |