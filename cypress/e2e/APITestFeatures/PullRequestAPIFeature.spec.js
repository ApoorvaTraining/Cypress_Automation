describe('Pull Requests via API', () => {
    const accessToken = Cypress.env('GITHUB_TOKEN');
    const owner = 'ApoorvaTraining'; // replace with your GitHub username or organization
    const repo = 'Cypress_Automation'; // replace with your repository name
    const baseBranch = 'main'; // base branch you want to merge into
    const headBranch = 'PullRequestFeature'; // branch you want to merge from
  
    it('should create a new pull request', () => {
      const pullRequestTitle = 'Automated Pull Request';
      const pullRequestBody = 'This pull request was created for automation testing.';
  
      cy.request({
        method: 'POST',
        url: `https://api.github.com/repos/${owner}/${repo}/pulls`,
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        body: {
          title: pullRequestTitle,
          body: pullRequestBody,
          head: headBranch, // branch to merge from
          base: baseBranch, // branch to merge into
        },
      }).then((response) => {
        // Verify the response status and content
        expect(response.status).to.eq(201); // Status code for Created
        expect(response.body).to.have.property('title', pullRequestTitle);
        expect(response.body).to.have.property('body', pullRequestBody);
        expect(response.body).to.have.property('head').that.includes({ ref: headBranch });
        expect(response.body).to.have.property('base').that.includes({ ref: baseBranch });
  
        // Store pull request number for later use if needed
        const pullRequestNumber = response.body.number;
      });
    });
  
    it('should verify the created pull request', () => {
      // Assume the pull request number was stored during creation
      const pullRequestNumber = 1; // replace with the actual pull request number if needed
  
      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pullRequestNumber}`,
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }).then((response) => {
        // Verify that the pull request metadata matches the expected values
        expect(response.status).to.eq(200); // Status code for OK
        expect(response.body).to.have.property('title', 'Automated Pull Request'); // check title
        expect(response.body).to.have.property('body', 'This pull request was created for automation testing.'); // check body
        expect(response.body.head.ref).to.eq(headBranch); // check head branch
        expect(response.body.base.ref).to.eq(baseBranch); // check base branch
      });
    });
  });