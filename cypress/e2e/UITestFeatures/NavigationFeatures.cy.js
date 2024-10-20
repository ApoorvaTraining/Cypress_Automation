describe('Navigation Between Repository Features', () => {
    //const repoUrl = 'https://github.com/ApoorvaTraining/Cypress_Automation';
    const UserName = 'ApoorvaTraining';
    const repoName = 'Cypress_Automation';
    const repoUrl = `https://github.com/${UserName}/${repoName}`;


    // Helper function to verify page load
    const verifyPageLoad = (tabName, expectedURL) => {
        // Use cy.contains to find the tab by its text and click it
        cy.wait(1000);
        cy.xpath("//ul[@class = 'UnderlineNav-body list-style-none']//li").contains(tabName).filter(':visible').click(); 
        // Verify URL contains the tab name (converted to lowercase)
        cy.url().should('eq', expectedURL);
        // Verify key element is visible
       // cy.get(selectorToVerify).should('be.visible'); 
    };

    beforeEach(() => {
        // Visit the repository page before running tests
        cy.visit(repoUrl);
    });

    it('should navigate to Issues tab and verify content', () => {
        verifyPageLoad('Issues',`${repoUrl}/issues`); // Verify key content in "Code" tab
        cy.log("I am in Issues Tab");
    });

    it('should navigate to Pull Request tab and verify content', () => {
        verifyPageLoad('Pull requests',`${repoUrl}/pulls`); // Verify key content in "Code" tab
        cy.log("I am in Pull Request Tab");
    });

    it('should navigate to Actions tab and verify content', () => {
        cy.wait(100);
        verifyPageLoad('Actions',`${repoUrl}/actions`); // Verify key content in "Code" tab
        cy.log("I am in Actions Tab");
    });
});