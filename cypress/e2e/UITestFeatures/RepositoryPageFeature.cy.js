//import RepositoryPage from '../../support/RepositoryPage';
const RepositoryPage = require('../../support/RepositoryPage');
//import GitHubPage from '../../support/GitHubPage';  //-- this is Es6 format
const GitHubPage = require( '../../support/GitHubPage'); // this is Common js format

describe('GitHub Repository Creation', () => {

    let githubPage;
    const repoPage = new RepositoryPage();
    const baseRepoName = 'UserInterfaceRepo'; // Change this as needed for each test case
    let repoName;

    before(() => {

        githubPage = new GitHubPage(); // Create an instance of GitHubPage
        githubPage.visit(); // Call the visit method
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@gmail.com', 'Training#28');
        githubPage.clickLogin();
        
    });

    it('should create a private repository successfully', () => {

        repoName = repoPage.generateUniqueRepoName(baseRepoName); // Generate a unique repository name

        repoPage.createNewRepository(repoName, false);

        // Assert that the repository details are correct
        repoPage.verifyRepositoryDetails(repoName, false);

        cy.url().should('include', `/${repoName}`);
        //cy.wait(1000);
    });

    it('should create a public repository successfully', () => {
        const privateRepoName = 'MyPrivateTestRepo'; // Ensure the name is unique
        
        repoPage.createNewRepository(privateRepoName, true);
        
        // Assert that the repository details are correct
        repoPage.verifyRepositoryDetails(privateRepoName, true);

        cy.url().should('include', `/${privateRepoName}`);
    });

    it.only('should not allow creating a repository without a name', () => {
        repoPage.buttonNew().first().click(); // Click on 'New' repository button
 
        repoPage.buttonCreateRespository()
        .scrollIntoView()
        .should('be.visible')
        .click(); // Attempt to create without a name

        // Assert that an error message is displayed
        repoPage.verifyReponameErrorMessage('New repository name must not be blank');
        //cy.get('.flash-error').should('be.visible').and('contain', 'Repository name is required');
    });
    
    it('should display an error for an invalid repository name', () => {
        const invalidRepoName = 'Invalid/Repo*Name'; // Example of an invalid name
        
        repoPage.createNewRepository(invalidRepoName, false);
        
        // Assert that an error message is displayed
        repoPage.verifyReponameErrorMessage('The repository name can only contain ASCII letters, digits, and the characters ., -, and _.');
    });
});