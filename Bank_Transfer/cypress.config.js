const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "cypress/reports",
        overwrite: false,
        html: true,
        json: true,
    },
    fixturesFolder: "cypress/fixtures",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    e2e: {
        specPattern: "cypress/e2e/**/*.feature",
        supportFile: "cypress/support/e2e.js",
    },
});
