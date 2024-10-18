import GitHubPage from '../../support/GitHubPage';

describe('GitHub Login Test', () => {

    it('Logs into GitHub', () => {
        GitHubPage.visit();
        GitHubPage.clickSignIn();
        GitHubPage.enterCredentials('apoorvatraining@gmail.com', 'Training#28');
        GitHubPage.clickLogin();
        GitHubPage.verifyDashboard();

        GitHubPage.VerifySigOut();  // sometimes this step fails due to asynchronous caliing of the cypress comands and is fast.

    });

    it('Fail to login with invalid User name', () => {
        GitHubPage.visit();
        GitHubPage.clickSignIn();
        GitHubPage.enterCredentials('apoorvatraining@', 'Training#28');
        GitHubPage.clickLogin();
        GitHubPage.verifyErrorMessage('Incorrect username or password.');
    });

    it('Fails to log in with invalid password', () => {
        GitHubPage.visit();
        GitHubPage.clickSignIn();
        GitHubPage.enterCredentials('apoorvatraining@gmail.com', 'invalidPassword');
        GitHubPage.clickLogin();
        GitHubPage.verifyErrorMessage('Incorrect username or password.');
    });

    it('Fails to log in with empty fields', () => {
        GitHubPage.visit();
        GitHubPage.clickSignIn();
        GitHubPage.clickLogin(); // Click login without entering credentials
        GitHubPage.verifyErrorMessage('Please fill out this field.');  // this should be change to the Tooltip meesagage
    });
  });