import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import sanityTesting from "../../cypress/pageObject/sanity.js"
import utility from "../../cypress/pageObject/utility.js";

const sanityTest = new sanityTesting();
const utils = new utility();

Given('Verify each cart css background colour and get the each cart overlayed content',  ()=>{
    sanityTest.setTheHoveredContentText();
});

Given('Verify the overlayed content with actual cart name, cart price and add to cart option',  ()=>{
    sanityTest.verifyTheOverlayedContentTextInActualCart();
});

Given('Verify the heading in showing correctly',  ()=>{
    sanityTest.verifyHeadingHomepage();
});

When('Verify the sub heading is showing correctly',  ()=>{
    sanityTest.verifySubHeadingHomepage();
});

When('Verify the paragraph is showing correctly',  ()=>{
    sanityTest.verifyParagraphHomepage();
});

Then('Verify the button is visible and the text contains {string}',  (text)=>{
    sanityTest.verifyTheButtonTextHomepage(text);
});

When('Verify the contact us page is visible', ()=>{
    utils.verifyContactUsPageVisible();
})

When('Verify {string} form titile is visible', (text)=>{
    utils.contactPageTitleVisible(text);
})

When('Enter the {string} in contact form as {string}', (element, text)=>{
    utils.enterContactDetailsForm(element, text);
})

When('Enter the text message in contact form {string}', (textArea)=>{
    utils.enterContactDetailsFormTextarea(textArea);
})

When('Upload a file {string} in contact form', (fileName)=>{
    sanityTest.uploadFile(fileName);
})

When('click on contact form submit button', ()=>{
    sanityTest.clickContactFormSubmitBtn();
})

Then('Verify the contact form is submitted successfully', ()=>{
    sanityTest.verifyContactFormSubmitSuccessfully();
})

Given('Verify the subscription text is visible in homepage', ()=>{
    cy.xpath("//div[@class='single-widget']//h2").scrollIntoView().should('be.visible').and('have.text', 'Subscription')
})

When('Enter the current user email in email textbox', ()=>{
    utils.enterEmailInSubscription();
})

When('Click on subscription submit button', ()=>{
    utils.clickSubmitSubscriptionBtn()
})

When('Verify the subscribed successfully message shown', ()=>{
    utils.VerifySubscribedSuccessfullyMessage()
})

Then('Verify the testcase page url showing properly', ()=>{
    utils.testcasePageVisible();
})

Given('Get the random value with the count of {string}', (carts)=>{
    sanityTest.clickViewProduct(carts);
})

When('Click the cart and grab and then write a review', ()=>{
    sanityTest.writeReviewWithTheCart();
})

When('Click on the scroll to top icon in page bottom', ()=>{
    utils.clickScrollToTopIcon();
})

Then('Verify the page is scroll to top', ()=>{
    utils.verifyThepageScrollToTop();
})

Given('Verify the page scroll to bottom', ()=>{
    utils.scrollToBottom();
})

When('Verify the copyright text is visible properly', ()=>{
    utils.copyRightIsVisible();
})