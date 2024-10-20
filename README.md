# GIT UI Automation with Cypress


## Overview
This project utilizes [Cypress](https://www.cypress.io/) for end-to-end (E2E) testing of Github application. It includes both UI and API test cases to ensure the functionality and reliability of the application.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)
- [Reporting](#reporting)
- [Contributing](#contributing)
- [License](#license)

## Features
- Automated UI testing with Cypress.
- API testing for RESTful endpoints.
- Custom reporting with Mochawesome.
- Test cases for various scenarios, including:
  - Repository creation and management.
  - Issue tracking and management.
  - Pull requests handling.
  - Sigup and Login functionality
  - Navigation of various tabs
  - Authentication and permission validation.

## Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- cypress client (13.15.0)
- MailSurlp (to mock the test users)
- cypress-mochawesome-reporter 

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ApoorvaTraining/Cypress_Automation.git
2. Install Npm & Cypress from the official Website   
   npm init -y
   npm install
   npm install cypress --save-dev
   npm install mocha@10.2.0 --save-dev
   npx cypress open  -- this will run the Cypress open source UI of your test scrips


  ## Folder Structure:
  Cypress_Automation/
│
├── cypress/
│   ├── e2e/
│   │   ├── APITestFeatures/
│   │   │   ├── RepositoryAPIFeature.spec.js
│   │   │   └── IssueAPIFeature.spec.js
|   |   |-- |__ PullRequestAPIFeature.spec.js
|   |   |-- |__ AuthenticationAuthoristion.spec.js
│   │   ├── UITestFeatures/
│   │   │   ├── LoginPageFeature.cy.js
│   │   │   └── IssueTrackingFeature.cy.js
|   |   |-- |__ NavigationFeature.cy.js
|   |   |-- |__ PullRequestFeature.cy.js
|   |   |-- |__ RepsoitoryPageFeature.cy.js
|   |   |-- |__ SignupPageFeature.cy.js
│   └── fixtures/
│       └── example.json
|   |__ reports/
|   |   |__ Screenshots
|   |   |__ index.html
|   |   |__ assets
|   |__ support/
|   |   |__ commands.js
|   |   |__ index.js
|   |   |__ e2e.js
|   |   |__ GitHubPage.js
|   |   |__ issueTracking.js
|   |   |__ PullRequestPage.js
|   |   |__ RepositoryPage.js
├── cypress.config.js
├── cypress.env.json
├── package.json
└── README.md 


# Running tests:

To run all tests, use the following command:
npx cypress run

To open the Cypress Test Runner:
npx cypress open

You can also specify particular tests to run using:
npx cypress run --spec "cypress/e2e/your_test_spec.js"

# Notes:

1. For Running the API test cases you need to provide the Access token for your github account that you are using. 
2. Also add your valid Repository names and Pull request names in the test cases for valid automation Running
3. Ensure you have a MailSurlp account craeted for running the Signup test cases and provide the authentication details in the scrits.
4. Make sure you install all the version that are comaptible with each other for Cypress mocha and Reporters. Users version are provide in package.json and cypress.config.js
