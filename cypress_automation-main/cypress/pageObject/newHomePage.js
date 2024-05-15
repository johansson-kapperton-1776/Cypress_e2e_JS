import SharedFunctions from "../pageObject/sharedFunction.js";
import { loginMap } from "./login.js";
import utility from "./utility.js";

export const dataMap = new Map();

export class newPage extends utility {

    verifyHomePage() {
        //const userType = loginMap.get('userType')
        const userName = loginMap.get('userName')
        const verifyUserName = " Logged in as " + userName
        cy.url().should('include', 'https://automationexercise.com/')
        cy.xpath(SharedFunctions.getXPathValue('pageHeader')).contains('Logged in as').should('have.text', verifyUserName)
    }

    verifyHomepageSection() {
        cy.xpath("//div[@class='logo pull-left']//a//img").should('be.visible').and('have.attr', 'src')
    }

    grabPageHeaderNames() {
        const headerNames = [];
        cy.xpath(SharedFunctions.getXPathValue('pageHeader')).should('exist').then(() => {
            for (let i = 0; i < 10; i++) {
                cy.xpath(SharedFunctions.getXPathValue('pageHeader')).eq(i).invoke('text').then((headers) => {
                    headerNames.push(headers)
                });
            }
        });
        dataMap.set('pageHeaderNames', headerNames)
    }


    verifyPageHeaderNames() {
        cy.wrap(null).then(() => {
            const getHeaderName = dataMap.get('pageHeaderNames')
            if (getHeaderName) {
                for (let i = 0; i < getHeaderName.length; i++) {
                    cy.xpath(SharedFunctions.getXPathValue('pageHeader')).eq(i).should('have.text', getHeaderName[i])
                }
            }
        })
    }

    dynamicSplitPattern(dynamicSplitPattern) {
        return dynamicSplitPattern = /(?=[A-Z][a-z])/;
    }

    trimmedText(text) {
        return text = text.replace(/\n|\t/g, '').trim()
    }

    grabHeadingHomePage() {
        cy.getTextValue(SharedFunctions.getXPathValue('headingName')).then((heading) => {
            const seperateHeading = heading.split(this.dynamicSplitPattern())
            dataMap.set('heading', seperateHeading)
        })
    }

    grabCategoryNameHomePage() {
        cy.getTextValue(SharedFunctions.getXPathValue('categoryName')).then((catName) => {
            let trimmedText = catName.replace(/\n|\t/g, '').trim();
            const spliText = trimmedText.split(this.dynamicSplitPattern())
            dataMap.set('categoryName', spliText)
        })
    }

    grabBrandNameHomePage() {
        cy.getTextValue(SharedFunctions.getXPathValue('brandName')).then((brandNamesWithCounts) => {
            const brandNameArray = brandNamesWithCounts.match(/\((\d+)\)([^\(]+)/g);
            const modifiedArray = brandNameArray.map(element => {
                const match = element.match(/\((\d+)\)([^\(]+)/);
                if (match) {
                    return match[2].trim(); // Extract the brand name and trim any extra spaces
                } else {
                    return element; // Return the original element if no match is found
                }
            });
            dataMap.set('brandName', modifiedArray)
        });
    }

    verifyHeadingHomepage() {
        const headingname = dataMap.get('heading')
        if (headingname.length > 0) {
            for (let index = 0; index < headingname.length; index++) {
                cy.verifyTextContains(SharedFunctions.getXPathValue('headingName'), index, headingname[index])
            }
        }
    }

    verifyCategoryNameHomePage() {
        const headingname = dataMap.get('heading')
        const categoryName = dataMap.get('categoryName')
        headingname.forEach((headNames) => {
            if (categoryName.length > 0 && headNames === 'Category') {
                if (categoryName.length > 0) {
                    for (let index = 0; index < categoryName.length; index++) {
                        cy.verifyTextContains(SharedFunctions.getXPathValue('categoryName'), index, categoryName[index])
                    }
                }
            }
        })
    }

    verifyBrandHomePage() {
        const headingname = dataMap.get('heading')
        const brandName = dataMap.get('brandName')
        headingname.forEach((headNames) => {
            if (brandName.length > 0 && headNames === 'Brands') {
                for (let index = 0; index < brandName.length; index++) {
                    cy.verifyTextContains(SharedFunctions.getXPathValue('brandName'), index, brandName[index])
                }
            }
        })
    }

    grabSideSectionSubCategoryNames() {
        const categoryNames = dataMap.get('categoryName')
        categoryNames.forEach((categoryName) => {
            cy.xpath("//a[normalize-space()='" + categoryName + "']").should('be.visible').click({ force: true })
            cy.xpath("//div[@id='" + categoryName + "']//li").should('be.visible').invoke('text').then((catName) => {
                const trimmedCatName = catName.trim();
                const category = trimmedCatName.split(' ')
                const topsIndex = category.indexOf('Tops');
                const shirtsIndex = category.indexOf('Shirts');
                if (topsIndex !== -1 && shirtsIndex !== -1) {
                    category.splice(topsIndex, shirtsIndex - topsIndex + 1, 'Tops & Shirts');
                }
                dataMap.set(categoryName, category)
            })
        })
        cy.reload();
    }

    getSideSectionSubCategorynames() {
        const categoryNames = dataMap.get('categoryName')
        for (let index in categoryNames) {
            const subCategories = dataMap.get(categoryNames[index]);
            subCategories.forEach((subCategory) => {
                cy.xpath(SharedFunctions.getXPathValue('categoryIcon')).eq(index).should('be.visible').click({ force: true })
                cy.xpath("//div[@id='" + categoryNames[index] + "']//a[contains(text(),'" + subCategory + "')]").should('be.visible')
                    .and('contain', subCategory).click({ force: true })
                const productDetail = `${categoryNames[index]} > ${subCategory}`
                const productsPageTitle = `${categoryNames[index]} - ${subCategory} Products`
                const categoryDetails = `Category: ${productDetail}`
                cy.xpath(SharedFunctions.getXPathValue('productsCategories')).should('be.visible').and('have.text', productDetail)
                cy.xpath(SharedFunctions.getXPathValue('productTitle')).should('be.visible').and('have.text', productsPageTitle)
                cy.xpathIsVisible(SharedFunctions.getXPathValue('singleCartXpath')).then((attrCount) => {
                    for (let i = 0; i < attrCount.length; i++) {
                        this.clickProduct(index)
                        cy.xpathIsVisible(SharedFunctions.getXPathValue('itemCategory')).should('contain', categoryDetails)
                        cy.go('back')
                    }
                })
                cy.reload()
            })
        }
        cy.clickOnXpath(SharedFunctions.getXPathValue('clickHomePage'))
    }


}

export default newPage;

