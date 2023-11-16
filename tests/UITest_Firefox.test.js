const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const { uiTest } = require('./uiTest');

const firefox = require('selenium-webdriver/firefox');
const firefoxOptions = new firefox.Options();
firefoxOptions.addArguments(['--headless']);
const driver = new Builder().forBrowser('firefox').setChromeOptions(firefoxOptions).build();


uiTest(driver);


