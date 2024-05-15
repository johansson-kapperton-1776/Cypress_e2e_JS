export class SharedFunctions {

    static loadXPathValues() {
        cy.fixture("xpath.json").then((data) => {
            this.xPathVals = data;
        });
    }

    static getXPathValue(key){
        return this.xPathVals[key];
    }

    static loadIdValues() {
        cy.fixture("id-mapping.json").then((data) => {
            this.idVals = data;
        });
    }

    static getIdValue(key){
        return this.idVals[key];
    }

    static loadTextValues() {
        cy.fixture("texts.json").then((data) => {
            this.textVals = data;
        });
    }

    static getTextValue(key){
        return this.textVals[key];
    }
}

export default SharedFunctions;