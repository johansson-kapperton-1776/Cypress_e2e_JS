Feature: API Testing

    Scenario: Get all product details GET response from API
        Given Verify the response status code is 200
        Then Verify the response status message is 'OK'

    Scenario: Get all brand list using GET Api method
        Given Get all brand list using GET API method
        When Verify the brand list in each cart in UI
        And Get all the values from api response
        Then Validate the cart name cart price and category in each cart and 'brand'