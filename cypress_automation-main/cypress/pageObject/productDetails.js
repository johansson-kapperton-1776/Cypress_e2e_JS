import SharedFunctions from "../pageObject/sharedFunction.js";
import newPage, { dataMap } from "../pageObject/newHomePage.js";
import { loginMap } from "./login.js";


export class productDetails extends newPage {


    getApiResponseValue() {

        return new Cypress.Promise((resolve, reject) => {
            cy.getApiResponse().then((response) => {
                let resBody = response.body;
                resBody = JSON.parse(resBody);
                let resProducts = resBody.products;
                resolve(resProducts)
            })
        })
    }

    getCartNamePriceCategory() {
        const cartName = [];
        const cartPrice = [];
        const categoryNames = []
        this.getApiResponseValue().then((response) => {
            for (let id in response) {
                let resAllVal = response[id];
                const itemName = resAllVal.name;
                const itemPrice = resAllVal.price;
                let catUserType = resAllVal.category.usertype.usertype;
                let categoryName = resAllVal.category.category;
                let categories = catUserType + " > " + categoryName
                categories = "Category: " + categories;
                cartName.push(itemName)
                cartPrice.push(itemPrice)
                categoryNames.push(categories)
            }
            dataMap.set('cartName', cartName)
            dataMap.set('cartPrice', cartPrice)
            dataMap.set('categoryNames', categoryNames)
        })
    }

    validateCartNamePriceCategory(section) {
        const cartName = dataMap.get('cartName')
        const cartPrice = dataMap.get('cartPrice')
        const category = dataMap.get('categoryNames')
        const brandList = dataMap.get('brandList')
        cartName.forEach((itemName, index) => {
            const itemPrice = cartPrice[index]
            const categoryItem = category[index]
            this.clickProduct(index)
            if(section == 'side section') {
            this.verifyHeadingHomepage();
            this.verifyCategoryNameHomePage();
            this.verifyBrandHomePage();
            }
            cy.xpath(SharedFunctions.getXPathValue('itemName')).should('be.visible').should('have.text', itemName);
            cy.xpath(SharedFunctions.getXPathValue('itemPrice')).should('be.visible').should('have.text', itemPrice);
            cy.xpath(SharedFunctions.getXPathValue('itemCategory')).should('be.visible').contains(categoryItem)
            if(section == 'brand') {
            cy.xpath(SharedFunctions.getXPathValue('productsBrand')).should('be.visible').and('contain', `Brand: ${brandList[index]}`)
            }
            cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
        })
    }

    verifyEachCartValidationInHomePage() {
        for (let i = 0; i <= 33; i++) {
            cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i).should('be.visible').invoke('text').then((cartName) => {
                cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(i).should('be.visible').invoke('text').then((cartPrice) => {
                    this.clickProduct(i)
                    this.verifyHeadingHomepage();
                    this.verifyCategoryNameHomePage();
                    this.verifyBrandHomePage();
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('itemName')).should('have.text', cartName);
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('itemPrice')).should('have.text', cartPrice);
                    cy.xpath(SharedFunctions.getXPathValue('clickHomePage')).contains('Home').click({ force: true });
                });
            });
        }
    }

    verifySearchProduct() {
        let jsonKey = Object.keys(Cypress.env('searchProduct'));
        for (let i = 0; i < jsonKey.length; i++) {
            const randomKey = jsonKey[Math.floor(Math.random() * jsonKey.length)];
            const searchValue = Cypress.env('searchProduct')[randomKey]
            cy.clickOnText(SharedFunctions.getXPathValue('productBtn'), 'Products')
            cy.enterValue(SharedFunctions.getIdValue('searchProduct'), searchValue)
            cy.clickOnButton(SharedFunctions.getIdValue('submitSearch'))
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i - 1).should('be.visible').contains(searchValue, { matchCase: false })
                }
            });
        }
    }

    getSearchProductNameRandomly() {
        const searchValuesArray = []
        let jsonKey = Object.keys(Cypress.env('searchProduct'));
        for (let i = 0; i < jsonKey.length; i++) {
            const randomKey = jsonKey[Math.floor(Math.random() * jsonKey.length)];
            const searchValueRandom = Cypress.env('searchProduct')[randomKey]
            searchValuesArray.push(searchValueRandom)
        }
        dataMap.set('searchValue', searchValuesArray)
    }

    validateSearchProductRandomly() {
        const searchValues = dataMap.get('searchValue')
        searchValues.forEach((searchValue) => {
            cy.clickOnText(SharedFunctions.getXPathValue('productBtn'), 'Products')
            cy.enterValue(SharedFunctions.getIdValue('searchProduct'), searchValue)
            cy.clickOnButton(SharedFunctions.getIdValue('submitSearch'))
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i - 1).should('be.visible').contains(searchValue, { matchCase: false })
                }
            });
        })
    }

    brandCount() {
        let count = null
        const brandName = dataMap.get('brandName')
        brandName.forEach((brandNames, index) => {
            cy.clickOnText(SharedFunctions.getXPathValue('brandName'), brandNames)
            cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                for (let i = 0; i <= attrCount.length; i++) {
                    count = "(" + i + ")"
                }
                cy.xpath(SharedFunctions.getXPathValue('brandCount')).eq(index).should('be.visible').and('have.text', count)
            });
        })
    }

    writeValuesInJsonFile() {
        const header = dataMap.get('pageHeaderNames')
        const category = dataMap.get('categoryName')
        const brand = dataMap.get('brandName')
        const subCategoryWomen = dataMap.get('Women')
        const subCategoryMen = dataMap.get('Men')
        const subCategoryKids = dataMap.get('Kids')
        cy.writeFile('src/fixtures/writeFile.json',
            {
                header: header,
                category: category,
                brand: brand,
                Women: subCategoryWomen,
                Men: subCategoryMen,
                Kids: subCategoryKids
            })
    }

    readTheHeaderValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((headerValues) => {
            const header = headerValues.header
            for (let i = 0; i < header.length; i++) {
                cy.xpath(SharedFunctions.getXPathValue('pageHeader')).eq(i).should('have.text', header[i])
            }
        })
    }


    readTheCategoryValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((categoryValues) => {
            const category = categoryValues.category
            for (let index = 0; index < category.length; index++) {
                cy.verifyTextContains(SharedFunctions.getXPathValue('categoryName'), index, category[index])
                const subCategories = categoryValues[category[index]]
                cy.xpath(SharedFunctions.getXPathValue('categoryIcon')).eq(index).should('be.visible').click({ force: true })
                subCategories.forEach((subCategory) => {
                    cy.xpath("//div[@id='" + category[index] + "']//a[contains(text(),'" + subCategory + "')]").should('be.visible')
                        .and('contain', subCategory)
                });
                cy.reload();
            }
        });
    }

    readTheBrandValuesFromStoredJsonFile() {
        cy.readFile('src/fixtures/writeFile.json').then((brandValues) => {
            const brands = brandValues.brand
            for (let index = 0; index < brands.length; index++) {
                cy.verifyTextContains(SharedFunctions.getXPathValue('brandName'), index, brands[index])
            }
        })
    }

    grabAllCartNamePrice() {
        const cartName = []
        const cartPrice = []
        cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
            for (let i = 0; i < attrCount.length; i++) {
                cy.xpath(SharedFunctions.getXPathValue('productName')).eq(i).should('be.visible').invoke('text').then((name) => {
                    cy.xpath(SharedFunctions.getXPathValue('productPrice')).eq(i).should('be.visible').invoke('text').then((price) => {
                        cartName.push(name)
                        cartPrice.push(price)
                    });
                });
            }
            cy.writeFile('src/fixtures/writeFile.json',
                {
                    count: attrCount.length,
                    itemName: cartName,
                    itemPrice: cartPrice
                })
            dataMap.set('cartName', cartName)
            dataMap.set('cartPrice', cartPrice)
        })
    }


    getCartNamePriceRandomly(howManyCarts) {
        cy.readFile('src/fixtures/writeFile.json').then((val) => {
            const count = val.count
            const cartName = val.itemName
            const cartPrice = val.itemPrice
            this.randomNumbers(count, howManyCarts).then((randNum) => {
            randNum.forEach((num) => {
                cy.xpath(SharedFunctions.getXPathValue('singleCartXpath')).eq(num).should('be.visible')
                    .and('contain', cartName[num], cartPrice[num]).contains('Add to cart').click({ force: true })
                this.firstCartAdded();
                this.continueShoppingButton();
            })
            dataMap.set('randomNumber', randNum)
             })
        })
    }

    cartPageIsVisible() {
        cy.url().should('include', 'https://automationexercise.com/view_cart')
    }

    findRepeatedValues(myArray) {
        const seenElements = {};
        const duplicates = [];
        myArray.forEach(element => {
            if (seenElements[element]) {
                duplicates.push(element);
            } else {
                seenElements[element] = true;
            }
        });
        return duplicates
    }

    countOccurrences(array) {
        const countMap = {};
        array.forEach(value => {
            if (countMap[value]) {
                countMap[value]++;
            } else {
                countMap[value] = 1;
            }
        });
        return countMap
    }


    verifyAddressDetails(text) {
        const user = loginMap.get('userType')
        if (text == 'delivery address') {
            cy.xpath(SharedFunctions.getXPathValue('addressDetails')).should('be.visible')
                .and('contain', 'Your delivery address')
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `Mr. ${Cypress.env("signUpUserDetails")[user].firstName} ${Cypress.env("signUpUserDetails")[user].lastName}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].comapany}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].address}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].address2}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').contains(`${Cypress.env("signUpUserDetails")[user].city} ${Cypress.env("signUpUserDetails")[user].state} ${Cypress.env("signUpUserDetails")[user].zipcode}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].country}`)
            cy.xpath(SharedFunctions.getXPathValue('addressDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].mobileNumber}`)
        } else {
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails')).should('be.visible')
                .and('contain', 'Your billing address')
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `Mr. ${Cypress.env("signUpUserDetails")[user].firstName} ${Cypress.env("signUpUserDetails")[user].lastName}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].comapany}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].address}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].address2}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').contains(`${Cypress.env("signUpUserDetails")[user].city} ${Cypress.env("signUpUserDetails")[user].state} ${Cypress.env("signUpUserDetails")[user].zipcode}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].country}`)
            cy.xpath(SharedFunctions.getXPathValue('addressInvoiceDetails'))
                .should('be.visible').and('contain', `${Cypress.env("signUpUserDetails")[user].zipcode}`)
        }
    }

    verifyTotalCartAmount() {
        const totalAmount = dataMap.get('cartAddedTotalAmount')
        const totalPrice = totalAmount.reduce((sum, price) => {
            const numericalValue = parseInt(price.split(' ')[1]);
            return sum + numericalValue;
        }, 0);
        cy.xpathIsVisible("//tbody/tr/td[4]/p[1]").should('have.text', 'Rs. ' + totalPrice)
    }

    verifyTextAndClickPlaceOrder() {
        cy.xpathIsVisible("//div[@id='ordermsg']//label")
            .should('contain', 'If you would like to add a comment about your order, please write it in the field below.')
        cy.xpathIsVisible("//div//a[@class='btn btn-default check_out']").should('contain', 'Place Order').click({ force: true })
    }


    verifyCartNamePriceTotalAmount() {
        const totalAmount = []
        const randNum = dataMap.get('randomNumber')
        const cartNames = dataMap.get('cartName')
        const cartPrices = dataMap.get('cartPrice')
        const repeatedValues = this.findRepeatedValues(randNum)
        const noRepeatedValues = [...new Set(randNum)];
        const quantity = this.countOccurrences(randNum)
        noRepeatedValues.forEach((num, index) => {
            if (repeatedValues.includes(num)) {
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartName')).eq(index).should('have.text', cartNames[num])
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartPrice')).eq(index).should('have.text', cartPrices[num])
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartQuantity')).eq(index).should('contain', quantity[num])
                const totalQuantity = quantity[num]
                if (totalQuantity > 1) {
                    const replacePrice = cartPrices[num].replace(/\D/g, '')
                    const totalNum = replacePrice * quantity[num]
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartPrice2')).eq(index).should('contain', totalNum)
                        .invoke('text').then((amountVal1) => {
                            totalAmount.push(amountVal1)
                        })
                }
                else {
                    cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartPrice2')).eq(index).should('have.text', cartPrices[num])
                        .invoke('text').then((amountVal1) => {
                            totalAmount.push(amountVal1)
                        })
                }

            } else {
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartName')).eq(index).should('have.text', cartNames[num])
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartPrice')).eq(index).should('have.text', cartPrices[num])
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartQuantity')).eq(index).should('contain', quantity[num])
                cy.xpathIsVisible(SharedFunctions.getXPathValue('cartPageCartPrice2')).eq(index).should('have.text', cartPrices[num])
                    .invoke('text').then((amountVal1) => {
                        totalAmount.push(amountVal1)
                    })
            }

        })
        console.log(totalAmount);
        dataMap.set('cartAddedTotalAmount', totalAmount)
    }


}

export default productDetails