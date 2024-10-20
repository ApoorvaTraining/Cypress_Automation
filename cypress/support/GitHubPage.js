class GitHubPage {
    visit() {
      cy.visit('https://github.com/');
    }
  
    clickSignIn() {
      cy.get('.text-right > .HeaderMenu-link').click();
    }

    clickSignUp() {
      cy.get('.HeaderMenu-link--sign-up').click();
    }

    continueButton(){
      return cy.xpath("//button[contains(text(), 'Continue') and @type='button']");
    }

    clickEmail(){
       return cy.get('#email');
    }

    clickPassword(){
      return cy.get('#password');
    }
  
    clickUserName(){
      return cy.get('#login');
    }
  
  
    enterCredentials(email, password) {
      cy.get('#login_field').type(email);
      cy.get('#password').type(password);
    }
  
    clickLogin() {
      cy.get('input[name="commit"]').click();
    }

    VerifySigOut(){
     cy.get('.Button-label > .avatar').click();
     cy.xpath('//span[text()="Sign out"]').click();
      //cy.get('.btn btn-sm m-0').click();
    }
  
    verifyDashboard() {
        cy.get('.AppHeader-context-item-label').invoke('text')
        .then((text) => 
          {
          expect(text.trim()).to.eq('Dashboard');
          })
    }

    verifyErrorMessage(expectedMessage){
      cy.get('.js-flash-alert').should('be.visible').and('contain', expectedMessage);

    }

    verifyEmailerrorMessage(expectedMessage){
      cy.get('#email-err').should('be.visible').and('contain', expectedMessage);
    }

    verifyPassworderrorMessage(expectedMessage){
      cy.get('#password-err').should('be.visible').and('contain', expectedMessage);
    }

    verifyUsernameErrorMessage(expectedMessage){
      cy.get('#login-err').should('be.visible').and('contain', expectedMessage);
    }

    // verifyTooltipMessage(expectedtooltip){
    //   cy.get()
    // }

    generateUniqueUsername() {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const usernameLength = 10; // Adjust the length as needed
      let username = '';
  
      // Generate a random username
      for (let i = 0; i < usernameLength; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          username += characters[randomIndex];
      }
  
      // Add a hyphen at a random position (not at the start or end)
      const hyphenPosition = Math.floor(Math.random() * (usernameLength - 1)) + 1;
      username = username.slice(0, hyphenPosition) + '-' + username.slice(hyphenPosition);
  
      return username; // e.g. 'abcde-fghi'
  }
  }
  
  module.exports = GitHubPage;
  //export default new GitHubPage();