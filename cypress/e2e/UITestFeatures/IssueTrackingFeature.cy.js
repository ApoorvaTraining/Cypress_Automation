const GitHubPage = require( '../../support/GitHubPage'); 
const IssueTrackingPage = require('../../support/IssueTracking');


describe('GitHub Issue Tracking - UI Test', () => {

    let githubPage;

    const issueTitle = 'Test Issue';
    const issueBody = 'This is a test issue for automation purposes.';
    const labelName = 'bug'; // Example label
    const assignee = 'ApoorvaTraining'; // Example assignee

    before(() => {
        // Log in to GitHub
        githubPage = new GitHubPage(); // Create an instance of GitHubPage
        githubPage.visit(); // Call the visit method
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@gmail.com', 'Training#28');
        githubPage.clickLogin();

        // Navigate to the repository's issues page
        cy.visit('https://github.com/ApoorvaTraining/Cypress_Automation/issues'); // Change the URL to your repository
    });

    it('should create a new issue successfully', () => {
        // Click on the "New issue" button
       // cy.xpath("//*[@class='Button-label']//span[contains(text(),'New issue')]").click();
        cy.contains('New issue').click();

        // Enter issue title and body
        cy.get('#issue_title').type(issueTitle);
        cy.get('#issue_body').type(issueBody);

        // Click the "Submit new issue" button
        cy.contains('Submit new issue').click();

        // Verify issue creation
        cy.get('.gh-header-title > .js-issue-title').should('contain', issueTitle);
       // js-issue-title markdown-title
        cy.get('.comment-body').should('contain', issueBody);
    });

    it('should add a label to the issue', () => {
        // Open the issue from the list
        cy.get('#issue_4_link').click();

        //display lables list
       // cy.xpath("//*[@class='Button-label']//span[contains(text(),'New issue')]").click();
        cy.get('#labels-select-menu > .discussion-sidebar-heading > .octicon').click();

        // Select a label
        cy.contains(labelName).click({force: true});

        // Verify the label is added
        cy.get('.IssueLabel').should('contain', labelName);
    });

    it('should assign a user to the issue', () => {

         // Open the issue from the list
         cy.get('#issue_4_link').click();

        // Open the assignees dropdown
        cy.get('#assignees-select-menu > .text-bold > .octicon').click();

        // Assign the issue to a user
        cy.get('.select-menu-item-heading > .description').contains(assignee).click();
        //cy.contains(assignee).click({force: true});

        // close the assignees dropdown
        cy.get('#assignees-select-menu > .text-bold').click();
        cy.wait(1000);

        // Verify the assignee is added
        cy.get('.assignee > .css-truncate-target').should('contain', assignee);
    });

    it('should list the created issue in the issues list', () => {
        // Navigate back to the issues list
        cy.visit('https://github.com/ApoorvaTraining/Cypress_Automation/issues');

        // Verify the issue appears in the list
        cy.wait(1000);
        cy.contains(issueTitle).should('be.visible');
    });

    it.only('should list the issue sorted by Assignee', () => {
        // Navigate back to the issues list
        cy.visit('https://github.com/ApoorvaTraining/Cypress_Automation/issues');

        //Select filter Assignee
        cy.xpath("//summary[contains(@class, 'btn-link') and contains(text(), 'Assignee')]").click()
        cy.xpath("(//a[contains(@class, 'SelectMenu-item') and contains(., 'ApoorvaTraining')])[2]").click({force: true});

        // Verify the issue appears in the list
        cy.wait(1000);
        cy.contains(issueTitle).should('be.visible');
    });
});