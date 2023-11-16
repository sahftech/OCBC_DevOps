const { Builder } = require('selenium-webdriver');
const { uiTest } = require('./UITest.js');

const firefox = require('selenium-webdriver/firefox');
const firefoxOptions = new firefox.Options();
firefoxOptions.addArguments('--headless');
const driver = new Builder().forBrowser('firefox').setChromeOptions(firefoxOptions).build();

uiTest(driver);