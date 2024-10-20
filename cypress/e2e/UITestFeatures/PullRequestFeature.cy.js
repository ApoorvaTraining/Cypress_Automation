const GitHubPage = require( '../../support/GitHubPage'); 
const PullRequestPage = require('../../support/PullRequestPage');

describe('Pull Request Workflow', () => {
    let githubPage;
    const repoName = 'Cypress_Automation'; // Replace with your repository name
    const branchName = 'feature/test-pull-request'; // Replace with your feature branch name
    const baseBranch = 'main'; // Replace with the base branch to merge into
    const pullRequestTitle = 'Test Pull Request';
    const pullRequestDescription = 'This is a test pull request for Cypress automation.';

    before(() => {

        githubPage = new GitHubPage(); // Create an instance of GitHubPage
        githubPage.visit(); // Call the visit method
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@gmail.com', 'Training#28');
        githubPage.clickLogin();

        cy.wait(1000);
        
    });

    it('should View, review, and merge a pull request', () => {
        // Step 1: Navigate to the Repository
        cy.visit(`https://github.com/ApoorvaTraining/${repoName}`); // Replace with your user/repo

        //Navigate to Pull Request tab
        cy.get('[data-content="Pull requests"]').click();

        cy.contains('New pull request').click();  // Click on New Pull Request Button

        cy.wait(1000);
        cy.get('#head-ref-selector > .btn').click(); // select the head branch to comapare
        cy.xpath("//span[contains(text(), 'api_automation_tests')]").click(); // Select the Branch from drop down

        // Step 2: View Pull Request and Verify Description via Assertin
        cy.contains('View pull request').click(); // Click on view pull request button
        cy.wait(1000);
        cy.xpath("//div[contains(@class, 'comment-body markdown-body')]")
        .filter(':visible')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            const cleanText = text.replace(/\s+/g, ' ').trim();

            cy.log('Original text:', text);
            cy.log("Trim text", cleanText);

            expect(cleanText).to.equal("This pull request was created for automation testing.");
        });

       // cy.xpath("//div[contains(@class, 'comment-body markdown-body')]").should('have.text',"This pull request was created for automation testing.");


        // Step 3: Review and Add a comment Pull Request
        cy.wait(100);
        cy.get('#new_comment_field')
        .should('be.visible')
        .type("This is a new Pull Request"); // Click on Pull Requests

        cy.xpath("//button[normalize-space(text())='Comment']")
        .should('be.visible')
        .click(); // Click on comment button

        cy.wait(1000);

        cy.xpath("//td[contains(@class, 'd-block comment-body markdown-body')]")
        .filter(':visible')
        .last()
        .should('be.visible')
        .invoke('text') // Correctly invoke text to retrieve the comment text
        .then((commentText) => {
            const cleanCommentText = commentText.replace(/\s+/g, ' ').trim();
            cy.log('Comment text:', cleanCommentText);
            expect(cleanCommentText).to.equal("This is a new Pull Request");
        });


        // Step 5: Merge the Pull Request
        cy.contains('Merge pull request').click(); // Click on Merge button
        cy.xpath("//button[contains(text(), 'Cancel')]").filter(':visible').click();
        cy.contains('Merge pull request').click(); // Click on Merge button
        cy.xpath("//button[contains(text(), 'Confirm merge')]").filter(':visible').click();
        cy.log("Pull Request Merged Successfully.")
    });
});