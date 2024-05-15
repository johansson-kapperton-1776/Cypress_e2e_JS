Feature: Product

    Scenario: Verify Homepage Logged in with Correct User
        Given Verify the logged in name in homepage
        Then Verify the homepage section

    Scenario: Grab and verify the page header names and category section
        Given Grab the page header names in homepage
        When Grab the side section heading names in homepage
        And Grab the side section category names in homepage
        And Grab the side section brand names in homepage
        Then Select side section category name and grab the sub category name

    Scenario: Write a json file from grabbed values and read the values for validation
        Given Get the stored datamap values and write the values in json file
        When Click on the 'Products' option in homepage
        And Read the header stored values from json file and validating headers
        And Read the category and sub category stored values from json file and validating categories
        Then Read the brand stored values from json file and validating brand

    Scenario: Verify the cart page is empty
        Given Click on the 'Cart' option in homepage
        And Verify the cart is empty in cart page

     Scenario: Grab the cart name and cart price in products page randomly and validating
        Given Click on the 'Products' option in homepage
        And Verify all the cart and select carts randomly 
        And Select the cart randomly and perform add to cart actions "20"
        And Click on the 'Cart' option in homepage
        And Verify the cart page is visible properly
        And Verify the cart names, cart price and total amount
        And Click on procced to checkout
        And Verify the 'delivery address' details
        And Verify the 'billing address' details
        And Verify total amount of the cart added
        Then Click on place order button