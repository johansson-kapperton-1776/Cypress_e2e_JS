import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import dataBase from "../../cypress/pageObject/dataBase";

const DataBase = new dataBase();


Given('Verify the database connectivity and get the all product values from database', ()=>{
    DataBase.dataBaseConnectivity();
})

Then('Verify the cart name and cart price in home page', ()=>{
    DataBase.verifyProductDetailsHomepage();
})

Given('Verify the cart name and cart price in product page', ()=>{
    DataBase.verifyProductDetailsProductsPage();
})





