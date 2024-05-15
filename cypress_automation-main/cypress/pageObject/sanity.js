import { dataMap } from "./newHomePage.js";
import productDetails from "./productDetails.js";
import SharedFunctions from "./sharedFunction.js";
import "cypress-real-events";

export class sanityTesting extends productDetails {

    addTwoCartsAndRemove() {
        this.clickFirstCart();
        this.firstCartAdded();
        this.continueShoppingButton();
        this.clickSecondCart();
        this.secondCartAdded();
        this.continueShoppingButtonSecond();
        this.cartButtonIsVisible();
        this.grabPageHeaderNames();
        this.verifyPageHeaderNames();
        this.addedCartOneIsVisible();
        cy.wait(2000)
        this.addedCartTwoIsVisible();
        this.verifyCartIsEmpty();
        this.clickHomePage();
    }

    hoverEachCartAndVerifyHoverColour(index) {
        return cy.xpath(SharedFunctions.getXPathValue('hoverSingleCartXpath')).eq(index).realHover().should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')
    }

    getEachCartHoveredContentText(index) {
        return cy.xpath(SharedFunctions.getXPathValue('hoveredContentXpath')).eq(index).should('be.visible').invoke('text').then((text) => {
            const cleanedText = text.trim().split('\n').map(item => item.trim()).filter(item => item !== '');
            return cleanedText
        })

    }

    setTheHoveredContentText() {
        const HoveredCartContextText = []
        cy.wrap(null).then(() => {
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attr) => {
                let count = attr.length
                for (let index = 0; index < count; index++) {
                    this.hoverEachCartAndVerifyHoverColour(index)
                    this.getEachCartHoveredContentText(index).then((text) => {
                        HoveredCartContextText.push(text)
                    })
                }
                dataMap.set('HoveredCartContextText', HoveredCartContextText)
            });
        });
    }

    verifyTheOverlayedContentTextInActualCart() {
        const verifyContextText = dataMap.get('HoveredCartContextText')
        verifyContextText.forEach((verifyTextArray, index) => {
            cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(index).should('be.visible').should('have.text', verifyTextArray[0])
            cy.xpath(SharedFunctions.getXPathValue('productName')).eq(index).should('be.visible').should('have.text', verifyTextArray[1])
            cy.xpath(SharedFunctions.getXPathValue('addToCartText')).eq(index).should('be.visible').should('contain', verifyTextArray[2])
        })
    }

    verifyHeadingHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//h1").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('headingHomepage'))
    }

    verifySubHeadingHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//h2").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('subHeadingHomepage'))
    }

    verifyParagraphHomepage() {
        cy.xpath("//div[@class='carousel-inner']//div//div//p").should('be.visible')
            .and('contain', SharedFunctions.getTextValue('paragraphHomepage'))
    }

    verifyTheButtonTextHomepage(text) {
        cy.xpath("//div[@class='carousel-inner']//div//div//a//button").should('be.visible')
            .and('contain', text)
    }

    uploadFile(fileName) {
        cy.xpath("//input[@name='upload_file']").attachFile(fileName)
    }

    clickContactFormSubmitBtn() {
        cy.xpath("//input[@data-qa='submit-button']").click({ force: true })
    }

    verifyContactFormSubmitSuccessfully() {
        cy.xpath("//div[@class='status alert alert-success']").should('be.visible')
            .and('have.text', 'Success! Your details have been submitted successfully.')
    }

    clickViewProduct(carts) {
        this.randomNumbers(30, carts).then((randNum) => {
            dataMap.set('cartRandNum', randNum)
        })
    }

    writeReviewWithTheCart() {
        const randomNumber = dataMap.get('cartRandNum')
        const userName = this.userLoggedInUserName();
        const Email = this.userLoggedInEmail();
        randomNumber.forEach((num) => {
            this.clickProduct(num)
            cy.xpathIsVisible(SharedFunctions.getXPathValue('itemName')).invoke('text').then((cartName) => {
                cy.xpathIsVisible(SharedFunctions.getXPathValue('itemPrice')).invoke('text').then((cartPrice) => {
                    cy.xpathIsVisible("//input[@id='name']").type(userName)
                    cy.xpathIsVisible("//input[@id='email']").type(Email)
                    cy.xpathIsVisible("//textarea[@id='review']").type(`The product name is ${cartName} and the price is ${cartPrice}`)
                    cy.xpathIsVisible("//button[@id='button-review']").click({ force: true })
                    cy.xpathIsVisible("//div[@class='alert-success alert']//span").should('have.text', 'Thank you for your review.')
                })
            })
            this.clickHomePage();
        })
    }


}

export default sanityTesting