import SharedFunctions from "./sharedFunction";
import { loginMap } from "./login";
import { dataMap } from "./newHomePage";

export class utility {


    clickFirstCart(index = 0) {
        return cy.xpath(SharedFunctions.getXPathValue('cart1')).eq(index).contains('Add to cart').should('be.visible').click({ force: true });
    }

    clickSecondCart(index = 1) {
        return cy.xpath(SharedFunctions.getXPathValue('cart2')).eq(index).contains('Add to cart').should('be.visible').click({ force: true });
    }

    firstCartAdded() {
        return cy.xpath(SharedFunctions.getXPathValue('cart1Text')).should('have.text', 'Added!')
    }

    continueShoppingButton() {
        return cy.xpath(SharedFunctions.getXPathValue('continueShoppingBtn1')).contains('Continue Shopping').should('be.visible').click({ force: true })
    }

    secondCartAdded() {
        return cy.xpath(SharedFunctions.getXPathValue('cart2Text')).should('have.text', 'Added!')
    }

    continueShoppingButtonSecond() {
        return cy.xpath(SharedFunctions.getXPathValue('continueShoppingBtn2')).contains('Continue Shopping').should('be.visible').click({ force: true })
    }

    cartButtonIsVisible() {
        return cy.xpath(SharedFunctions.getXPathValue('cartBtn')).should('be.visible').click({ force: true });
    }

    addedCartOneIsVisible() {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart1')).first().should('be.visible').click({ force: true });
    }

    addedCartTwoIsVisible() {
        return cy.xpath(SharedFunctions.getXPathValue('addedCart2')).first().should('be.visible').click({ force: true });
    }

    clickHomePage() {
        return cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
    }

    clickProduct(index = '') {
        return cy.xpath(SharedFunctions.getXPathValue('clickProduct')).eq(index).contains('View Product').should('be.visible').click({ force: true });
    }

    clickHeaderText(text) {
        return cy.xpath(SharedFunctions.getXPathValue('headersCommonXpath')).contains(text).should('be.visible').click({ force: true })
    }

    proceedToCheckoutBtn() {
        cy.xpathIsVisible(SharedFunctions.getXPathValue('proceedToCheckoutBtn')).should('have.text', 'Proceed To Checkout').click({ force: true })
    }

    cartPageIsVisible() {
        cy.url().should('include', 'https://automationexercise.com/view_cart')
    }

    verifyCartIsEmpty() {
        return cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
    }

    verifyContactUsPageVisible() {
        cy.url().should('include', 'https://automationexercise.com/contact_us')
    }

    contactPageTitleVisible(text) {
        return cy.xpath("//h2[@class='title text-center']").should('be.visible').and('contain', text)
    }

    userType() {
        const currentUser = loginMap.get('userType')
        return currentUser
    }

    userLoggedInUserName() {
        const userName = loginMap.get('userName')
        return userName
    }

    userLoggedInEmail() {
        const Email = loginMap.get('email')
        return Email
    }

    enterContactDetailsForm(element, text) {
        return cy.xpath("//input[@data-qa='" + element + "']").should('be.visible').type(Cypress.env("signUpUserDetails")[this.userType()][text])
    }

    enterContactDetailsFormTextarea(textArea) {
        return cy.xpath("//textarea[@id='message']").should('be.visible').type(Cypress.env("signUpUserDetails")[this.userType()][textArea])
    }

    enterEmailInSubscription() {
        cy.xpath("//input[@id='susbscribe_email']").should('be.visible').type(Cypress.env("signUpUserDetails")[this.userType()].email)
    }

    clickSubmitSubscriptionBtn() {
        return cy.xpath("//button[@type='submit']").should('be.visible').click({ force: true })
    }

    VerifySubscribedSuccessfullyMessage() {
        return cy.xpath("//div[@class='alert-success alert']").should('be.visible')
            .and('have.text', 'You have been successfully subscribed!')
    }

    clickScrollToTopIcon() {
        return cy.xpathIsVisible("//a[@id='scrollUp']").click({force:true})
    }
    
    scrollToBottom() {
        return cy.window().scrollTo('bottom')
    }

    copyRightIsVisible() {
        return cy.xpathIsVisible("//div[@class='footer-bottom']//p").should('have.text', 'Copyright © 2021 All rights reserved')
    }

    verifyThepageScrollToTop() {
        cy.wait(500)
        cy.window().then((win)=>{
            const scrollPosition = win.scrollY;
            expect(scrollPosition).to.equal(0);
        })
    }

    randomNumbers(count, howManyCarts) {
        return cy.wrap(null).then(() => {
            const randomNumber = []
            for (let i = 0; i < howManyCarts; i++) {
                let randNum = Math.floor(Math.random() * count); // Generates a random number between 0 and 34
                randomNumber.push(randNum)
            }
            return randomNumber
        })
    }

    cartIsEmpty() {
        return cy.ifXPathExist("//tbody//td[@class='cart_product']").then((exist) => {
            if (exist) {
                cy.xpathIsVisible("//tbody//td[@class='cart_product']").then((attr) => {
                    const attrCount = attr.length
                    console.log(attrCount);
                    for (let index = 0; index < attrCount; index++) {
                        cy.wait(2000)
                        cy.xpathIsVisible("//tbody//td[@class='cart_delete']//i").first().click({ force: true })
                    }
                })
            } else {
                return cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
            }
            cy.xpath(SharedFunctions.getXPathValue('cartIsEmptyText')).contains('Cart is empty!').should('be.visible');
        })
    }

    testcasePageVisible() {
        return cy.url().should('include', 'https://automationexercise.com/test_cases')
    }

    getAllBrandsList() {
        const arrayBrand = []
         cy.allBrandList().then((brandList)=>{
            expect(brandList.status).to.eq(200)
            expect(brandList.statusText).to.eq('OK')
             const body = JSON.parse(brandList.body)
             const brands = body.brands
             expect(body.responseCode).to.eq(200)
             Object.keys(brands).forEach((val)=>{
                arrayBrand.push(brands[val].brand)
             })
            dataMap.set('brandList', arrayBrand)
         })
     }
 
 
     verifyBrandSinUi() {
         const brandList = dataMap.get('brandList')
         console.log(brandList);
     }

}

export default utility