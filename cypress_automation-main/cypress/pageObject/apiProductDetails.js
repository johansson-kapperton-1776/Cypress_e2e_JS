import SharedFunctions from "../pageObject/sharedFunction.js";

export class apiProductDetails {

    getApiData() {
        cy.readApiData().then((apiData) => {
            this.dataMap.set('apiDataSet', apiData)
        })
    }

    getApiResponse() {
        cy.getApiResponse().then((apiResponse) => {
            const productName = [];
            const productPrice = [];
            let apiRes = apiResponse.body
            apiRes = JSON.parse(apiRes)
            let productRes = apiRes.products
            for (let i in productRes) {
                let productRes1 = productRes[i]
                productName.push(productRes1.name);
                productPrice.push(productRes1.price);
            }
            productName.forEach(cartName => {
                cy.xpathIsVisible(SharedFunctions.getXPathValue('productName')).contains(cartName);
            });
            productPrice.forEach((cartPrice) => {
                cy.xpathIsVisible(SharedFunctions.getXPathValue('productPrice')).contains(cartPrice);
            });
        });
    }
}

export default apiProductDetails