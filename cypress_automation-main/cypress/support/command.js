// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })




Cypress.Commands.add('loginWithSession', (userType) => {
    const userName = Cypress.env(userType).Email;
    const passWord = Cypress.env(userType).Password
    cy.session([userName, passWord], () => {
        cy.visit('/login')
        cy.xpath("//input[@data-qa='login-email']").should('be.visible').type(userName)
        cy.xpath("//input[@data-qa='login-password']").should('be.visible').type(passWord)
        cy.xpath("//button[@data-qa='login-button']").should('be.visible').click({ force: true })
    });
})

Cypress.Commands.add('setHeaders', (arr) => {
    Cypress.env('getHeaderNames', arr);
});

Cypress.Commands.add('getHeaders', () => {
    return Cypress.env('getHeaderNames');
});

Cypress.Commands.add('setHeaders', () => {
    const nameHead = []
    cy.xpath("//ul[@class='nav navbar-nav']//li").should('exist').then(() => {
        for (let i = 0; i < 10; i++) {
            cy.xpath("//ul[@class='nav navbar-nav']//li").eq(i).invoke('text').then((headers) => {
                nameHead.push(headers)
            });
        }
    });
    Cypress.env('getHeaderNames', nameHead);
});


Cypress.Commands.add('verifyHeaders', () => {
    const headerNames = Cypress.env('getHeaderNames')
    console.log(headerNames)
    const headerLength = headerNames.length - 1
    for (let i = 0; i <= headerLength; i++) {
        cy.xpath("//ul[@class='nav navbar-nav']//li").eq(i).should('have.text', headerNames[i])
    }
})

Cypress.Commands.add('getApiData', () => {
    cy.fixture('api.json').then((apiData) => {
        Cypress.env('apiData', apiData)
    })
})

Cypress.Commands.add('readApiData', () => {
    return Cypress.env('apiData')
})

Cypress.Commands.add('setDataMap', (key, value) => {
    cy.wrap({ [key]: value }).as('dataMap');
});

Cypress.Commands.add('getDataMap', (key) => {
    return cy.get('@dataMap').then((dataMap) => dataMap[key]);
});




//----------------------------------------------------------------------------------------------------



Cypress.Commands.add('getTextValue', (xpath) => {
    cy.xpath(xpath).should('be.visible').invoke('text').then((text) => {
        return text;
    })
})

Cypress.Commands.add('xpathIsVisible', (xpath) => {
    cy.xpath(xpath).should('be.visible').then((xpathVisible) => {
        return xpathVisible;
    })
})

Cypress.Commands.add('clickOnXpath', (xpath) => {
    cy.xpath(xpath).should('be.visible').click({ force: true }).then((clickOnXpath) => {
        return clickOnXpath;
    })
})

Cypress.Commands.add('getApiResponse', () => {
    cy.request('https://automationexercise.com/api/productsList').as('comments');
    cy.get('@comments').then((apiResponse) => {
        return apiResponse;
    });
});

Cypress.Commands.add('verifyTextContains', (xpath, index, text) => {
    cy.xpath(xpath).eq(index).should('be.visible').and('contain.text', text)
});

Cypress.Commands.add('xpathExists', (xpath) => {
    cy.xpath(xpath).should('be.visible').and('exist')
});

Cypress.Commands.add('enterValue', (element, searchValue) => {
    cy.get(element).should('be.visible').clear().type(searchValue)
});

Cypress.Commands.add('clickOnText', (xpath, text) => {
    cy.xpath(xpath).should('be.visible').contains(text).click({ force: true }).then((clickOnText) => {
        return clickOnText;
    })
});

Cypress.Commands.add('clickOnButton', (element) => {
    cy.get(element).should('be.visible').click({ force: true })
});

Cypress.Commands.add('elementExists', (element) => {
    cy.xpath(xpath).should('exist')
})

Cypress.Commands.add("ifXPathExist", (xpath) => {
    return cy.xpath('count(' + xpath + ')')
})

Cypress.Commands.add('apiGetRes', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList').as('apiResponse')
    cy.get('@apiResponse').then((response) => {
        return response
    });
})

Cypress.Commands.add('apiPostRes', () => {
    cy.request('POST', 'https://automationexercise.com/api/productsList').as('postRes')
    cy.get('@postRes').then((response) => {
        return response
    })
});

Cypress.Commands.add('allBrandList', () => {
    cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/brandsList',
        failOnStatusCode: false
    }).as('brandList')
    cy.get('@brandList').then((res) => {
        return res
    })
})









