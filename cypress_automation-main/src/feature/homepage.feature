
Feature: Homepage

    Scenario: Verify Homepage Logged in with Correct User
        Given Verify the logged in name in homepage
        Then Verify the homepage section

    Scenario: Grab and verify the page header names and category section
        Given Grab the page header names in homepage
        When Grab the side section heading names in homepage
        And Grab the side section category names in homepage
        And Grab the side section brand names in homepage
        And Verify the page header names in homepage
        And Verify side sections category and brands heading in the page
        And Verify side sections category names in the page
        Then Verify side sections brand names in the page

    Scenario: Verify the each cart validation with api response
        Given Get all the values from api response
        Then Validate the cart name cart price and category in each cart and 'side section'

    Scenario: Give search product name and verify the correct product has been displayed
        Given Get the search value randomly
        Then Validate the search values in products page

    Scenario: Get the brand count and validate the brand counts values
        Given Verify the brand count in homepage

    Scenario: Grab the side section sub category names and verify
        Given Select side section category name and grab the sub category name
        Then Get the side section sub category names from category





