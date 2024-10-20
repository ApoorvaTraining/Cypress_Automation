describe('Navigation Between Repository Features', () => {
    const repoUrl = 'https://github.com/ApoorvaTraining/Cypress_Automation';

    // Helper function to verify page load
    const verifyPageLoad = (tabName, selectorToVerify) => {
        cy.get(`a[title='${tabName}']`).click(); // Click on the tab
        cy.url().should('include', `/${tabName.toLowerCase()}`); // Verify URL contains the tab name
        cy.get(selectorToVerify).should('be.visible'); // Verify key element is visible
    };

    before(() => {
        // Visit the repository page before running tests
        cy.visit(repoUrl);
    });

    it('should navigate to Code tab and verify content', () => {
        verifyPageLoad('Code', '.file-navigation'); // Verify key content in "Code" tab
    });

    it('should navigate to Issues tab and verify content', () => {
        verifyPageLoad('Issues', '.js-issue-list'); // Verify key content in "Issues" tab
    });

    it('should navigate to Pull Requests tab and verify content', () => {
        verifyPageLoad('Pull requests', '.js-pull-request-list'); // Verify key content in "Pull Requests" tab
    });

    it('should navigate to Actions tab and verify content', () => {
        verifyPageLoad('Actions', '.workflow-list'); // Verify key content in "Actions" tab
    });

    it('should verify pagination on Issues tab', () => {
        cy.get(`a[title='Issues']`).click(); // Navigate to Issues tab
        cy.get('.pagination').should('exist'); // Check if pagination exists when applicable
    });

    it('should ensure UI consistency across tabs', () => {
        const commonElements = ['.AppHeader', '.AppFooter'];

        commonElements.forEach(selector => {
            cy.get(`a[title='Code']`).click(); // Go to Code tab
            cy.get(selector).should('be.visible'); // Check header and footer

            cy.get(`a[title='Issues']`).click(); // Go to Issues tab
            cy.get(selector).should('be.visible');

            cy.get(`a[title='Pull requests']`).click(); // Go to Pull Requests tab
            cy.get(selector).should('be.visible');

            cy.get(`a[title='Actions']`).click(); // Go to Actions tab
            cy.get(selector).should('be.visible');
        });
    });
});