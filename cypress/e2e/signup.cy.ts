describe('Signup functionality', () => {
  it('successfully signs up a new user', () => {
    // Replace 'http://localhost:3000/api/signup' with your actual signup endpoint
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/userAuth/signup',
      body: {
        username: 'testusername2',
        email: 'testusername2@example.com',
        password: 'testPassword18523'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('username', 'testusername2');
      expect(response.body).to.have.property('email', 'testusername2@example.com');
    });
  });
});