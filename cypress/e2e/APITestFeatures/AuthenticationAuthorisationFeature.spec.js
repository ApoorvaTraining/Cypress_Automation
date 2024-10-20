
// Check for Public Repository Access
describe('Public Repository Access', () => {
    const owner = 'ApoorvaTraining'; // Replace with your GitHub username
    const repo = 'Cypress_Automation'; // Replace with your repository name
  
    it('Should access public repository with valid token', () => {
      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${repo}`,
        headers: {
          Authorization: `token ${Cypress.env('GITHUB_TOKEN')}`, // Use your GitHub token
          'Accept': 'application/vnd.github.v3+json'
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Expect status code 200
        expect(response.body.name).to.eq(repo); // Validate repository name
        expect(response.body.private).to.eq(false); // Ensure it is a public repo
      });
    });
  });

  // Checks for Private Repository Access
  describe('Private Repository Access', () => {
    const owner = 'ApoorvaTraining'; // Replace with your GitHub username
    const privateRepo = 'Invalid-Repo-Name'; // Replace with your private repository name
  
    it('Should access private repository with valid token', () => {
      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${privateRepo}`,
        headers: {
          Authorization: `token ${Cypress.env('GITHUB_TOKEN')}`, // Use your GitHub token with repo scope
          'Accept': 'application/vnd.github.v3+json'
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Expect status code 200
        expect(response.body.name).to.eq(privateRepo); // Validate repository name
        expect(response.body.private).to.eq(true); // Ensure it is a private repo
      });
    });
  });

  //Checks for invalid User Access
  describe('Unauthorized Access to Private Repository', () => {
    const owner = 'ApoorvaTraining'; // Replace with your GitHub username
    const privateRepo = 'Invalid-Repo-Name'; // Replace with your private repository name
  
    it('Should fail to access private repository with invalid token', () => {
      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${privateRepo}`,
        headers: {
          Authorization: `token INVALID_TOKEN`, // Invalid token
          'Accept': 'application/vnd.github.v3+json'
        },
        failOnStatusCode: false // Allow non-2xx responses
      }).then((response) => {
        expect(response.status).to.eq(401); // Expect status code 401 Unauthorized
        expect(response.body.message).to.eq('Bad credentials'); // Validate error message
      });
    });
  });


   // Checks for Expired Tokens Access
  describe('Expired Token Handling', () => {
    const owner = 'ApoorvaTraining'; // Replace with your GitHub username
    const privateRepo = 'Invalid-Repo-Name'; // Replace with your private repository name
  
    it.only('Should fail to access repository with expired token', () => {
      cy.request({
        method: 'GET',
        url: `https://api.github.com/repos/${owner}/${privateRepo}`,
        headers: {
          Authorization: `ExpiredToken`, // Replace with an expired token
          'Accept': 'application/vnd.github.v3+json'
        },
        failOnStatusCode: false // Allow non-2xx responses
      }).then((response) => {
        expect(response.status).to.eq(404); // Expect status code 401 Unauthorized
        expect(response.body.message).to.eq('Not Found'); // Validate error message
      });
    });
  });