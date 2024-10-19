describe('GitHub API Tests - Create a New Repository', () => {
  
    const token = Cypress.env('GITHUB_TOKEN');
    
    it('should create a new repository via API', () => {
      
      // Generate a random repository name
      const repoName = `test-repo-${Math.random().toString(36).substring(7)}`;
  
      // API request to create a new repository
      cy.request({
        method: 'POST',
        url: 'https://api.github.com/user/repos', // GitHub API endpoint
        headers: {
          Authorization: `Bearer ${token}`, // Authorization using token
        },
        body: {
          name: repoName,
          description: 'This is a test repository',
          private: false
        }
      }).then((response) => {
        // Assertions
        expect(response.status).to.eq(201); // Repository created successfully
        expect(response.body.name).to.eq(repoName); // Validate repository name
        expect(response.body.private).to.be.false; // Validate repository is public
  
        // Print response for debugging purposes
        cy.log(JSON.stringify(response.body));
      });
    });

    it('should delete the test repository via API', () => {
        const repoName = '-invalid-repo-name';
      
        cy.request({
          method: 'DELETE',
          url: `https://api.github.com/repos/ApoorvaTraining/${repoName}`,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then((response) => {
          expect(response.status).to.eq(204); // Successful deletion
        });
      });
  
    it('should handle invalid inputs when creating a repository', () => {
      // Trying to create a repository with an invalid name
      const invalidRepoName = '@invalid-repo-name'; // Invalid repo name
  
      cy.request({
        method: 'POST',
        url: 'https://api.github.com/user/repos',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: invalidRepoName, // Invalid name
          description: 'This repository should not be created',
          private: false
        },
        failOnStatusCode: false // Allow Cypress to continue even if the request fails
      }).then((response) => {
        // Assertions
        expect(response.status).to.eq(422); // Unprocessable Entity for invalid name
        expect(response.body.message).to.contain('name is invalid'); // Error message
      });
    });

  });

  describe('GitHub API Tests - Fetch Repository Details', () =>{

        const accessToken = Cypress.env('GITHUB_TOKEN');
        const owner = 'ApoorvaTraining'; // replace with the actual owner
        const repo = 'Cypress_Automation'; // replace with the actual repository name

    it('should fetch the details of an existing public repository', () => {
         cy.request({
          method: 'GET',
          url: `https://api.github.com/repos/${owner}/${repo}`,
          headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
       }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', repo);
            expect(response.body).to.have.property('owner');
            expect(response.body.owner).to.have.property('login', owner);
      // Add other assertions as needed
    });
  });

    it('should return a 404 for a non-existent repository', () => {
         const nonExistentRepo = 'NonExistentRepo';
  
        cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${nonExistentRepo}`,
        headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
        },
         failOnStatusCode: false, // Prevent Cypress from failing the test on 404
        }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message', 'Not Found');
    });
    });

    it.only('should return a 404 for a private repository without access', () => {
        const privateRepo = 'PrivateRepo'; // replace with the actual private repository name
      
        cy.request({
          method: 'GET',
          url: `https://api.github.com/repos/${owner}/${privateRepo}`,
          headers: {
            Authorization: `token ${accessToken}`, // Ensure the token does not have access to this private repo
            Accept: 'application/vnd.github.v3+json',
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.have.property('message', 'Not Found');
        });
      });

  })