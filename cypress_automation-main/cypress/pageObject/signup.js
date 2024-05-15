import utility from "./utility"
import SharedFunctions from "./sharedFunction";

const Utils = new utility();

export class signUpPage {


    signUpNewUser(user) {
        cy.visit('/login')
        cy.xpathIsVisible(SharedFunctions.getXPathValue('newUserSignUp')).should('have.text', 'New User Signup!')
        cy.xpathIsVisible(SharedFunctions.getXPathValue('signUpForm')).find('[type="text"]').type(Cypress.env("signUpUserDetails")[user].username)
        cy.xpathIsVisible(SharedFunctions.getXPathValue('signUpForm')).find('[type="email"]').type(Cypress.env("signUpUserDetails")[user].email)
        cy.xpathIsVisible(SharedFunctions.getXPathValue('signUpForm')).find('[type="submit"]').click({ force: true })
        cy.ifXPathExist(SharedFunctions.getXPathValue('emailExists')).then((exist) => {
            if (!exist) {
                cy.url().should('include', 'https://automationexercise.com/signup')
                //cy.xpathIsVisible("//h2[@class='title text-center']").should('have.text', 'Enter Account Information')
                cy.xpathIsVisible(SharedFunctions.getXPathValue('genderSignUp')).should('be.visible').click({ force: true })
                cy.xpathIsVisible(SharedFunctions.getXPathValue('passwordSignUp')).type(Cypress.env("signUpUserDetails")[user].password)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('daySignUp')).select(Cypress.env("signUpUserDetails")[user].date)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('monthSignUp')).select(Cypress.env("signUpUserDetails")[user].month)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('yearsSignUp')).select(Cypress.env("signUpUserDetails")[user].year)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('firstNameSignUp')).type(Cypress.env("signUpUserDetails")[user].firstName)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('lastNameSignUp')).type(Cypress.env("signUpUserDetails")[user].lastName)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('companySignUp')).type(Cypress.env("signUpUserDetails")[user].comapany)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('addressSignUp')).type(Cypress.env("signUpUserDetails")[user].address)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('address2SignUp')).type(Cypress.env("signUpUserDetails")[user].address2)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('countrySignUp')).select(Cypress.env("signUpUserDetails")[user].country)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('stateSignUp')).type(Cypress.env("signUpUserDetails")[user].state)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('citySignUp')).type(Cypress.env("signUpUserDetails")[user].city)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('zipCodeSignUp')).type(Cypress.env("signUpUserDetails")[user].zipcode)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('mobileNumberSignUp')).type(Cypress.env("signUpUserDetails")[user].mobileNumber)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('createAccountBtnSignUp')).click({ force: true })
                cy.xpathIsVisible(SharedFunctions.getXPathValue('accountCreatedTextSignUp')).should('have.text', 'Account Created!')
                cy.xpathIsVisible(SharedFunctions.getXPathValue('continueBtnSignUp')).click({force:true})
                Utils.clickHeaderText('Logout')
            }
        })
    }
}

export default signUpPage