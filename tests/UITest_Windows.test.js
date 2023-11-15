const { Builder } = require('selenium-webdriver');
const { uiTest } = require('./UITest.js');

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--window-size=1920,1080")
const chromeDriver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();

const firefox = require('selenium-webdriver/firefox');
const firefoxOptions = new firefox.Options();
firefoxOptions.addArguments("--window-size=1920,1080")
const firefoxDriver = new Builder().forBrowser('firefox').setChromeOptions(firefoxOptions).build();

const edge = require('selenium-webdriver/edge');
const edgeOptions = new edge.Options();
edgeOptions.addArguments("--window-size=1920,1080")
const edgeDriver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(edgeOptions).build();


uiTest(chromeDriver);
uiTest(firefoxDriver);
uiTest(edgeDriver);