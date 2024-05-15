import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import newPage from "../../cypress/pageObject/newHomePage.js";
import productDetails from "../../cypress/pageObject/productDetails.js"
import sanityTesting from "../../cypress/pageObject/sanity.js"

const newPageHome = new newPage();
const ProductDetails = new productDetails();
const sanityTest = new sanityTesting();


    Given('Grab the page header names in homepage', ()=>{
        newPageHome.grabPageHeaderNames();
    });

    When('Grab the side section heading names in homepage', ()=>{
        newPageHome.grabHeadingHomePage();
    })

    When('Grab the side section category names in homepage', ()=>{
        newPageHome.grabCategoryNameHomePage();
    })

    When('Grab the side section brand names in homepage', ()=>{
        newPageHome.grabBrandNameHomePage();
    });

    When('Verify the page header names in homepage', ()=>{
        newPageHome.verifyPageHeaderNames();
    })

    When('Verify the side section {string} names in homepage', (section)=>{
        newPageHome.VerifySideSectionNamesInHomepage(section);
    });

    Given('Get all the values from api response', ()=>{
        ProductDetails.getCartNamePriceCategory();
    });

    Then('Validate the cart name cart price and category in each cart and {string}', (section)=>{
        ProductDetails.validateCartNamePriceCategory(section);
    })

    Given('Verify side sections category and brands heading in the page', ()=>{
        newPageHome.verifyHeadingHomepage();
    });

    Given('Verify side sections category names in the page', ()=>{
        newPageHome.verifyCategoryNameHomePage();
    });

    Given('Verify side sections brand names in the page', ()=>{
        newPageHome.verifyBrandHomePage();
    });

    Given('Get the search value randomly', ()=>{
        ProductDetails.getSearchProductNameRandomly();
    });

    Then('Validate the search values in products page', ()=>{
        ProductDetails.validateSearchProductRandomly();
    });

    Given('Verify the brand count in homepage', ()=>{
        ProductDetails.brandCount();
    });

    Given('Add two cart and verify and validate the two carts', ()=>{
        sanityTest.addTwoCartsAndRemove();
    });

    Given('Select side section category name and grab the sub category name', ()=>{
        newPageHome.grabSideSectionSubCategoryNames();
    });

    Then('Get the side section sub category names from category', ()=>{
        newPageHome.getSideSectionSubCategorynames();
    });

    


    
    
    
    