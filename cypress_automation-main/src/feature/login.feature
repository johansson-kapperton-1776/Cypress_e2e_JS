Feature: Login

	Scenario: Verify login with invalid user details
		Given Click on the 'Logout' option in homepage
		When Enter the email id 'aravind123@gmail.com'
		And Enter the password 'test33214'
		And Click on login submit button
		And verify the email and password are invalid
		Then Clear the all saved session storage

	Scenario: Login with valid email and password
		Given Login with valid email and password
		When Visit login page
		And Verify the logged in name in homepage
		Then Verify the homepage section


