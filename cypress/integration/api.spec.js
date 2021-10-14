/// <reference types="cypress" />

describe("r/dogecoin meme api", () => {
    const apiHost = 'https://api.doge-meme.lol/v1'

    it("Should pong", async () => {
        const response = await cy.request(`${apiHost}/ping`)
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('ping', 'pong!')
    })

    it('should not accept 0 as limit', async () => {
        const limit = 0
        const response = await cy.request({
            method: "GET",
            url: `${apiHost}/memes?limit=${limit}`,
            retryOnStatusCodeFailure: false,
            failOnStatusCode: false
        })
        expect(response.status).to.eq(422)
        expect(response.body.errors[0].msg).to.eq('ensure this value is greater than or equal to 1')
    })

    it("Should return expected number of memes", async () => {
        const limit = 5
        const response = await cy.request(`${apiHost}/memes?limit=${limit}`)
        expect(response.status).to.eq(200)
        expect(response.body.total).to.gt(0)
        expect(response.body.count).to.eq(limit)
        expect(response.body.data).to.have.length(limit)
    })

    it("Should have valid structure of each object", async () => {
        const limit = 30
        const response = await cy.request(`${apiHost}/memes?limit=${limit}`)
        expect(response.status).to.eq(200)
        const items = response.body.data
        for (const item of items) {
            expect(item).to.have.property('submission_id')
            const submission_id = item.submission_id
            expect(item).to.have.property('submission_url')
            expect(item).to.have.property('submission_title')
            expect(item.permalink).to.contain(`/r/dogecoin/comments/${submission_id}/`)
            expect(item).to.have.property('author')
            expect(item).to.have.property('created')
            expect(item).to.have.property('timestamp')
        }
    })
})
