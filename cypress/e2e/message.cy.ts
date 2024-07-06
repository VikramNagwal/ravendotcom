describe("sending database", () => {
    it('successfully send message to database', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/messages/send',
      body: {
        subject: "cypress database testing",
        message: "cypress dummy database data"
      }
    })
    .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('subject', "cypress database testing");
        expect(response.body).to.have.property('message', "cypress dummy database data");
    })
    })
})