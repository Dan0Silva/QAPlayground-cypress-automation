const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qaplayground.dev/",
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    viewportHeight: 1220,
    viewportWidth: 1080,
  },
});
