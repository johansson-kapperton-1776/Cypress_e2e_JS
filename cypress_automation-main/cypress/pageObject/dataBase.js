import apiTest from "./apiTesting"
import { dataMap } from "./newHomePage"
import SharedFunctions from "./sharedFunction"

export class dataBase extends apiTest{


    dataBaseConnectivity() {
        cy.task("queryDb", "select * from productDetails.cartDetails").then((dbVal) => {
            dataMap.set('productDetailsDb', dbVal)
        })
    }

    verifyProductDetailsHomepage() {
        const productDetails = dataMap.get('productDetailsDb')
        productDetails.forEach((item, index) => {
            console.log(item.products_name);
            cy.xpathIsVisible(SharedFunctions.getXPathValue('productName')).eq(index).should('have.text', item.products_name)
            cy.xpathIsVisible(SharedFunctions.getXPathValue('productPrice')).eq(index).should('have.text', item.products_price)
            cy.xpathIsVisible(SharedFunctions.getXPathValue('addToCartText')).eq(index).should('have.text', 'Add to cart')
        })
    }

    verifyProductDetailsProductsPage() {
        const productDetails = dataMap.get('productDetailsDb')
        productDetails.forEach((item, index) => { 
            this.clickProduct(index)
            cy.xpath(SharedFunctions.getXPathValue('itemName')).should('be.visible').should('have.text', item.products_name);
            cy.xpath(SharedFunctions.getXPathValue('itemPrice')).should('be.visible').should('have.text', item.products_price);
            cy.xpath(SharedFunctions.getXPathValue('itemCategory')).should('be.visible').contains(item.products_category_category)
            cy.xpath(SharedFunctions.getXPathValue('productsBrand')).should('be.visible').and('contain', `Brand: ${item.products_brand}`)
            cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });

        })
    }

}

export default dataBase