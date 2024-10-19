describe('Create and List Issues via API', () => {
    const accessToken = Cypress.env('GITHUB_TOKEN');
    const owner = 'ApoorvaTraining'; // replace with the actual owner
    const repo = 'Cypress_Automation'; // replace with the actual repository name
    let createdIssue;
  
    it('should create a new issue', () => {
      const issueTitle = 'Invalid Bug Created for Automation';
      const issueBody = 'This is a test issue created for automation purpose via Cypress run.';
  
      cy.request({
        method: 'POST',
        url: `https://api.github.com/repos/${owner}/${repo}/issues`,
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        body: {
          title: issueTitle,
          body: issueBody,
        },
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('title', issueTitle);
        expect(response.body).to.have.property('body', issueBody);
        createdIssue = response.body; // Store created issue for later verification
      });
    });

    it('should retrieve the created issue', () => {
        cy.request({
          method: 'GET',
          url: `https://api.github.com/repos/${owner}/${repo}/issues/${createdIssue.number}`,
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('title', createdIssue.title);
          expect(response.body).to.have.property('body', createdIssue.body);
        });
      });

      it('should list issues and include the created issue', () => {
        cy.request({
          method: 'GET',
          url: `https://api.github.com/repos/${owner}/${repo}/issues`,
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const issueFound = response.body.find(issue => issue.number === createdIssue.number);
          expect(issueFound).to.exist; // Check that the created issue is in the response
          expect(issueFound).to.have.property('title', createdIssue.title);
          expect(issueFound).to.have.property('body', createdIssue.body);
        });
      });

      it('should return an error for creating an issue without a title', () => {
        cy.request({
          method: 'POST',
          url: `https://api.github.com/repos/${owner}/${repo}/issues`,
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
          body: {
            body: 'This issue has no title.', // Title is missing
          },
          failOnStatusCode: false, // Prevent Cypress from failing the test on 422
        }).then((response) => {
          expect(response.status).to.eq(422);
          expect(response.body).to.have.property('message'); // Check for an error message
        });
      });
  });