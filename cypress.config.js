const { defineConfig } = require('cypress');
const mochawesome = require('mochawesome');

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {

      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
      // implement node event listeners here
    },

    specPattern: 'cypress/e2e/**/*.spec.js',

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});