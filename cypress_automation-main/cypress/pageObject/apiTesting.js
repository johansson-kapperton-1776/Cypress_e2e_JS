import sanityTesting from "./sanity"


export class apiTest extends sanityTesting{


    getAllProductsList() {
        cy.apiGetRes().then((res)=>{
        })
    }

    verifyStatusCode(statusCode) {
        cy.apiGetRes().then((res)=>{
             expect(res.status).to.eq(statusCode)
        })
    }

    verifyStatusMessage(statusMessage) {
        cy.apiGetRes().then((res) => {
            expect(res.statusText).to.eq(statusMessage)
        })
    }

    verifyPostResponseError() {
        cy.apiPostRes().then((res)=>{
           const body = res.body
            expect(body.responseCode).to.eq(405)
            expect(body.message).to.eq('This request method is not supported.')
        })
    }

   



}

export default apiTest

