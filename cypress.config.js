const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',


  e2e: {
    baseUrl: 'https://testertest.77diamondstest.com/',
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
