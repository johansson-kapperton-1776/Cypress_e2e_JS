import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import productDetails from "../../cypress/pageObject/productDetails.js";
import utility from "../../cypress/pageObject/utility.js";

const ProductDetails = new productDetails();
const util = new utility();

Given('Get the stored datamap values and write the values in json file', ()=>{
    ProductDetails.writeValuesInJsonFile();
});

Given('Read the header stored values from json file and validating headers', ()=>{
    ProductDetails.readTheHeaderValuesFromStoredJsonFile();
});

When('Read the category and sub category stored values from json file and validating categories', ()=>{
    ProductDetails.readTheCategoryValuesFromStoredJsonFile();
});

When('Read the brand stored values from json file and validating brand', ()=>{
    ProductDetails.readTheBrandValuesFromStoredJsonFile();
});

When('Click on the {string} option in homepage', (text)=>{
    util.clickHeaderText(text);
});

Given('Verify all the cart and select carts randomly', (carts)=>{
    ProductDetails.grabAllCartNamePrice(carts);
});

When('Select the cart randomly and perform add to cart actions {string}', (howManyCarts)=>{
    ProductDetails.getCartNamePriceRandomly(howManyCarts);
});


When('Verify the cart page is visible properly', ()=>{
    util.cartPageIsVisible();
});

When('Verify the cart names, cart price and total amount', ()=>{
    ProductDetails.verifyCartNamePriceTotalAmount();
});

When('Click on procced to checkout', ()=>{
    ProductDetails.proceedToCheckoutBtn();
});

When('Verify the cart is empty in cart page', ()=>{
    util.cartIsEmpty();
});

When('Verify the {string} details', (text)=>{
    ProductDetails.verifyAddressDetails(text);
});

When('Verify total amount of the cart added', (text)=>{
    ProductDetails.verifyTotalCartAmount(text);
});

Then('Click on place order button', ()=>{
    ProductDetails.verifyTextAndClickPlaceOrder();
});

