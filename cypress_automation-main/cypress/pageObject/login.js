import signUpPage from "./signup";

export const loginMap = new Map();

export class login extends signUpPage {

    visitLoginpage() {
        return cy.visit('/login')
    }

    typeEmailInLoginPage(Email) {
        return cy.xpath("//input[@data-qa='login-email']").should('be.visible').type(Email)
    }

    typePasswordInLoginPage(passWord) {
        return cy.xpath("//input[@data-qa='login-password']").should('be.visible').type(passWord)
    }

    clickSubmitButtonInLoginPage() {
        return cy.xpath("//button[@data-qa='login-button']").should('be.visible').click({ force: true })
    }

    incorrectEmailPassword() {
        return cy.xpath("//div[@class='login-form']//p").should('be.visible').and('have.text', 'Your email or password is incorrect!')
    }


    loginPage(userType) {
        const Email = Cypress.env("signUpUserDetails")[userType].email;
        const passWord = Cypress.env("signUpUserDetails")[userType].password
        const userName = Cypress.env("signUpUserDetails")[userType].username
        cy.session([Email, passWord], () => {
            this.signUpNewUser(userType);
            this.visitLoginpage();
            this.typeEmailInLoginPage(Email);
            this.typePasswordInLoginPage(passWord);
            this.clickSubmitButtonInLoginPage();
        });
        loginMap.set('userType', userType)
        loginMap.set('userName', userName)
        loginMap.set('email', Email)
    }
   
}

export default login;
