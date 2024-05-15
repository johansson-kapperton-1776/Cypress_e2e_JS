import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import apiTest from "../../cypress/pageObject/apiTesting";
import utility from "../../cypress/pageObject/utility";

const ApiTest = new apiTest();
const utils = new utility();

Given('Get all products list from API', ()=>{
    ApiTest.getAllProductsList();
})

When('Verify the response status code is {int}', (statusCode)=>{
    ApiTest.verifyStatusCode(statusCode)
})

Then('Verify the response status message is {string}', (statusMessage)=>{
    ApiTest.verifyStatusMessage(statusMessage);
})

Given('Verify the response 405 error message', ()=>{
    ApiTest.verifyPostResponseError();
})

Given('Get all brand list using GET API method', ()=>{
    utils.getAllBrandsList();
})

Then('Verify the brand list in each cart in UI', ()=>{
    utils.verifyBrandSinUi();
})



