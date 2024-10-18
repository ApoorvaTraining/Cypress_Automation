class PullRequestPage {
    visit() {
      cy.visit('https://github.com/');
    }

    createNewRepository(repoName, isPrivate) {

        //cy.wait(1000);

        cy.xpath('//span[@class="Button-label" and text()="New"]').first().click(); // Click on 'New' repository button
        cy.get('[data-testid="repository-name-input"]').type(repoName, { force: true }); // Enter repository name
        

        cy.wait(5000);
       // Check visibility option
        if (isPrivate) {
            cy.get("input[type='radio'][name='visibilityGroup'][value='public'].Radio__StyledRadio-sc-1tx0ht9-0").check(); // Select Public
            //cy.get('#repository_visibility_private').check(); // Select private
        } else {
            cy.get("input[type='radio'][name='visibilityGroup'][value='private'].Radio__StyledRadio-sc-1tx0ht9-0").check(); // Select Private
            
            //cy.get('#repository_visibility_public').check(); // Select public
        }
        
        cy.get('button[type="submit"]:contains("Create repository")')
        .scrollIntoView()
        .should('be.visible')
        .click();

        cy.log("I clciked on Create repository button"); // Click on the create repository button

    }

    verifyRepositoryDetails(repoName, isPrivate) {

        const ownerName = 'ApoorvaTraining';  // Replace with your actual GitHub username
        const fullRepoName = `${ownerName}/${repoName}`;

        
        // Verify the full repository name (owner/repo)
        cy.get('ul.list-style-none > li:last-child > a.AppHeader-context-item > span.AppHeader-context-item-label')
          .should('contain', repoName);

        // You can also verify the full owner/repository name if needed
        cy.get('ul.list-style-none > li > a.AppHeader-context-item')
          .should('contain', ownerName);
    }

     generateUniqueRepoName(baseName) {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, ""); // Format: YYYYMMDDTHHMMSS
        return `${baseName}-${timestamp}`; // Example: repoName-20231018T123456
    }

    verifyReponameErrorMessage(expectedMessage){
        cy.get('#RepoNameInput-message').should('be.visible').and('contain', expectedMessage);
      }
  

  }
  
  module.exports = PullRequestPage;