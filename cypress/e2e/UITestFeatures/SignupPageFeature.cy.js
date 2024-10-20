import GitHubPage from '../../support/GitHubPage';
const { MailSlurp } = require('mailslurp-client');

describe('GitHub sign-up Process with New User', () => {

     const mailslurp = new MailSlurp({ apiKey: '40e68e610aa23b06d8a1b8fc7154b6546c0efcc3b8833cb132994fb190e8ecf1' });
     const githubPage = new GitHubPage();
    
     beforeEach(() => {
        cy.viewport(1536, 864);; // Maximize the window to avoid hidden elements
     });

    it('should sign up a new user and reach the verification screen', () => {
        const uniqueUsername = githubPage.generateUniqueUsername();
    
        // Step 1: Create a new inbox for sign-up email verification
        cy.wrap(mailslurp.createInbox()).then(inbox => {
            const emailAddress = inbox.emailAddress;  // Capture the generated email address
    
            // Step 2: Visit GitHub and sign up with the generated email
            githubPage.visit();
            githubPage.clickSignUp(); // Click on "Sign up"
    
            // Helper function to click the "Continue" button based on index
            const clickContinueButton = (index) => {
                githubPage.continueButton()
                    .eq(index) // Use eq(index) to select the button by its index
                    .should('be.enabled') // Ensure the button is enabled before clicking
                    .click({ force: true });
            };
    
            // Step 3: Fill in the email and click Continue
            githubPage.clickEmail().type(emailAddress, { force: true });
            clickContinueButton(0);
    
            // Step 4: Fill in the password and click Continue
            githubPage.clickPassword().type('YourSecurePassword', { force: true });
            clickContinueButton(1);

            cy.wait(10000);
    
            // Step 5: Fill in the username and click Continue
            githubPage.clickUserName().type(uniqueUsername);
            cy.wait(6000); // Wait for 1 second to ensure the username is fully entered
            clickContinueButton(2);
    
            // Step 6: Check the opt-in checkbox and click Continue
            cy.get('#opt_in').check().should('be.checked');
            clickContinueButton(3);

            cy.wait(1000); 

            // Pause the test for manual intervention
            cy.log('Please complete the verification process manually, then resume the test.');
            cy.wait(10000); // Pause for 10 seconds (optional, can be removed)

            /*Note: You need to Manually clcik on verify button to Verify the
             images dispalyed on the screen and click on submit button */
    
            // Step 7: Wait for the verification screen and enter the verification code
            cy.get('[autofocus=""]', { timeout: 10000 }).should('be.visible'); // Adjust timeout as needed

            cy.wrap(mailslurp.waitForLatestEmail(inbox.id, 30000), { timeout: 40000 }).then(email => {
                // Step 8: Extract the verification code from the email body
                const verificationCode = email.body.match(/(\d{8})/)[1]; // Adjust regex if necessary
    
                // Step 9: Enter the verification code into the input fields
                // Assuming the first input has autofocus
                cy.get('[autofocus=""]').type(verificationCode.charAt(0));
                cy.get('fieldset > .d-flex > :nth-child(2)').type(verificationCode.charAt(1));
                cy.get('fieldset > .d-flex > :nth-child(3)').type(verificationCode.charAt(2));
                cy.get('fieldset > .d-flex > :nth-child(4)').type(verificationCode.charAt(3));
                cy.get('fieldset > .d-flex > :nth-child(5)').type(verificationCode.charAt(4));
                cy.get('fieldset > .d-flex > :nth-child(6)').type(verificationCode.charAt(5));
                cy.get('fieldset > .d-flex > :nth-child(7)').type(verificationCode.charAt(6));
                cy.get('fieldset > .d-flex > :nth-child(8)').type(verificationCode.charAt(7));
                
                // Step10: To verify that the Account is created successsfully.
                cy.get('.js-flash-alert > div').should('have.text','Your account was created successfully. Please sign in to continue')
    
        });
    });

    })

    it('should not enable the Continue button when email field is empty', () => {
        githubPage.visit();
        githubPage.clickSignUp();
    
        // Check that the Continue button is disabled when email is empty
        githubPage.continueButton()
          .first()
          .should('be.disabled');  // Assert that the button is disabled
    });

    it('should display an error for invalid email format', () => {

        const githubPage = new GitHubPage();
        githubPage.visit();
        githubPage.clickSignUp();
    
        // Enter an invalid email format
        githubPage.clickEmail().type('invalidemail@gmai#com', { force: true });
       
    
        // Assert that an error message for invalid email format is displayed
        githubPage.verifyEmailerrorMessage('Email is invalid or already taken');
    
    });

    it('should display an error for a short password', () => {
        const githubPage = new GitHubPage();
        
        githubPage.visit();
        githubPage.clickSignUp();
    
        // Fill in the email and click Continue
        githubPage.clickEmail().type('validemail@example.com', { force: true }).then(() => {
            githubPage.continueButton().first().click({ force: true });
        });
    
        // Enter a short password and click Continue
        githubPage.clickPassword().type('123', { force: true }).then(() => {
      
        // Assert that the error message for short password is displayed
            githubPage.verifyPassworderrorMessage('Password is too short')
         
        });
    });


    it('should display an error for a username that is already taken', () => {

        const githubPage = new GitHubPage();
        githubPage.visit();
        githubPage.clickSignUp();
    
        // Fill in the email and click Continue
        githubPage.clickEmail().type('validemail@example.com', { force: true });
        githubPage.continueButton().first().click({ force: true });
    
        // Fill in the password and click Continue
        githubPage.clickPassword().type('YourSecurePassword123', { force: true });
        githubPage.continueButton().eq(1).click({ force: true });
    
        // Enter a username that is already taken
        githubPage.clickUserName().type('test65', { force: true }).then(() =>
        {
            // Assert that an error message is displayed for username already taken
            githubPage.verifyUsernameErrorMessage('Username test65 is not available.');
        }); 
    });

})