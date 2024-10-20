const GitHubPage = require( '../../support/GitHubPage'); 
const PullRequestPage = require('../../support/PullRequestPage');

describe('Pull Request Workflow', () => {

    

    let githubPage;
    const repoName = 'Cypress_Automation'; // Replace with your repository name
    const branchName = 'PullRequestFeature'; // Replace with your feature branch name
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

         pullreqpage = new PullRequestPage();
        // Step 1: Navigate to the Repository
        cy.visit(`https://github.com/ApoorvaTraining/${repoName}`); // Replace with your user/repo

        //Navigate to pull Request:
        cy.get('[data-content="Pull requests"]').click();

        //Navigate to Pull Request tab
        pullreqpage.PullRequestTab().click();
        //cy.get('[data-content="Pull requests"]').click();

        // Click on New Pull Request Button
        pullreqpage.PullreqNewbutton().click();
       // cy.contains('New pull request').click();  

        cy.wait(1000);
        pullreqpage.HeadBranch().click(); // select the head branch to comapare
        pullreqpage.selectBranch().click();  // Select the API Branch from drop down


        // Step 2: View Pull Request and Verify Description via Assertin
        pullreqpage.viewPullRequestButton().click(); // Click on view pull request button
        cy.wait(1000);
        pullreqpage.ReqDescriptionbox()
        .filter(':visible')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            const cleanText = text.replace(/\s+/g, ' ').trim();

            cy.log('Original text:', text);
            cy.log("Trim text", cleanText);

            expect(cleanText).to.equal("This pull request was created for automation testing.");
        });


        // Step 3: Review and Add a comment Pull Request
        cy.wait(100);
        pullreqpage.NewCommentButton()
        .should('be.visible')
        .type("This is a new Pull Request"); //Add New Comment

        pullreqpage.CommentButton()
        .should('be.visible')
        .click(); // Click on comment button

        cy.wait(1000);

        pullreqpage.CommentList()
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
       
        pullreqpage.MergeRequest.click();
        pullreqpage.CancelMerge().click();
        pullreqpage.MergeRequest.click();
        pullreqpage.ConfirmMerge().click();
        cy.log("Pull Request Merged Successfully.");
    });
});