describe('Signup functionality', () => {
  it('successfully signs up a new user', () => {
    // Replace 'http://localhost:3000/api/signup' with your actual signup endpoint
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/userAuth/signup',
      body: {
        username: 'testUser',
        email: 'testuser@example.com',
        password: 'testPassword123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('username', 'Vikram Singh');
      expect(response.body).to.have.property('email', 'vikramr@example.com');
      expect(response.body).not.to.have.property('password');
    });

    // Optional: Cleanup by deleting the test user from the database
  });
});