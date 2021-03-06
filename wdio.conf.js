exports.config = {
    debug: process.env.DEBUG === '1',
    execArgv: process.env.DEBUG === '1' ? ['--inspect-brk=127.0.0.1:5859'] : [],
    specs: ['./test/features/**/*.feature'],
    exclude: [],
    capabilities: [
        {
            browserName: 'chrome',
        },
    ],
    sync: true,
    logLevel: 'error',
    outputDir: './test/reports/output',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    baseUrl: 'http://todomvc.com/examples/angularjs/#/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'cucumber',
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './test/reports/allure-results/',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
            },
        ],
        [
            'junit',
            {
                outputDir: './test/reports/junit-results/',
                outputFileFormat: (opts) => {
                    // optional
                    return `TEST-wdio.junit.${opts.cid}.xml`;
                },
            },
        ],
    ],
    cucumberOpts: {
        requireModule: ['@babel/register'],
        require: ['./test/step-definitions/*.js'], // <string[]> (file/dir) require files before executing features
        backtrace: true, // <boolean> show full backtrace for errors
        compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending steps
        source: false, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: false, // <boolean> fail if there are any undefined or pending steps
        tags: [], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 20000, // <number> timeout for step definitions
        ignoreUndefinedDefinitions: true, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    before() {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        chai.Should();
    },
    afterScenario() {
        browser.clearLocalStorage();
        browser.refresh();
    },
};
