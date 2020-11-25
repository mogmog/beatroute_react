// This is the script that runs in Node.js and starts the browser
const {BrowserTestDriver} = require('@probe.gl/test-utils');
new BrowserTestDriver().run({
    server: {
        // Bundles and serves the browser script
        command: 'webpack-dev-server',
        arguments: ['--env.render-test']
    },
    headless: true
});
