import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SharedFunctions from "../../cypress/pageObject/sharedFunction.js";
import newPage from "../../cypress/pageObject/newHomePage.js";
import login from "../../cypress/pageObject/login.js";
import signUpPage from "../../cypress/pageObject/signup.js";

const newPageHome = new newPage();
const Login = new login();
const SignUp = new signUpPage();
const userLogin = 'user2'

beforeEach(() => {
    Login.loginPage(userLogin);
    cy.visit('/')
    cy.getApiData();
});

before(() => {
    SharedFunctions.loadXPathValues();
    SharedFunctions.loadIdValues();
    SharedFunctions.loadTextValues();
})
    Given('Login with valid email and password', ()=>{
        Login.loginPage(userLogin)
    })

    When('Enter the email id {string}', (email)=>{
        Login.typeEmailInLoginPage(email)
    })

    When('Enter the password {string}', (password)=>{
        Login.typePasswordInLoginPage(password)
    })

    When('Click on login submit button', ()=>{
        Login.clickSubmitButtonInLoginPage();
    })

    Then('verify the email and password are invalid', ()=>{
        Login.incorrectEmailPassword();
    })

    Then('Clear the all saved session storage', ()=>{
        Cypress.session.clearAllSavedSessions();
    })

    Given('Verify the logged in name in homepage', () => {
        newPageHome.verifyHomePage()
    });

    Then('Verify the homepage section', ()=>{
        newPageHome.verifyHomepageSection();
    });

    Given('Visit login page', ()=>{
        cy.visit('/login')
    })
    
    Then('Verify the Text new user signup', ()=>{
        SignUp.verifySignUpText();
    })
    
    Then('Fill the {string} username and email details', (user)=>{
        SignUp.fillSignUpDetails(user);
    })
    
    Then('Sign Up page is visited properly',()=>{
        SignUp.signUpPage();
    })
    
    Then('Verify the title text in signup page',()=>{
        SignUp.verifyTitleText();
    })
    
    Then('Enter all {string} user details in signup page',(user)=>{
        SignUp.enterAllUserDetails(user);
    })
    
    Then('Enter {string} Address informations',(user)=>{
        SignUp.enterAddressInformation(user);
    })


    
    