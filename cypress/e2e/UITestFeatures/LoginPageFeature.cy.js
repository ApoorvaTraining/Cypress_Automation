import GitHubPage from '../../support/GitHubPage';

describe('GitHub Login Test', () => {

    const githubPage = new GitHubPage();

    it('Logs into GitHub', () => {
        githubPage.visit();
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@gmail.com', 'Training#28');
        githubPage.clickLogin();
        githubPage.verifyDashboard();

        githubPage.VerifySigOut();  // sometimes this step fails due to asynchronous caliing of the cypress comands and is fast.

    });

    it('Fail to login with invalid User name', () => {
        githubPage.visit();
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@', 'Training#28');
        githubPage.clickLogin();
        githubPage.verifyErrorMessage('Incorrect username or password.');
    });

    it('Fails to log in with invalid password', () => {
        githubPage.visit();
        githubPage.clickSignIn();
        githubPage.enterCredentials('apoorvatraining@gmail.com', 'invalidPassword');
        githubPage.clickLogin();
        githubPage.verifyErrorMessage('Incorrect username or password.');
    });

    it('Fails to log in with empty fields', () => {
        githubPage.visit();
        githubPage.clickSignIn();
        githubPage.clickLogin(); // Click login without entering credentials
        githubPage.verifyErrorMessage('Please fill out this field.');  // this should be change to the Tooltip meesagage
    });
  });