const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const chrome = require('selenium-webdriver/chrome');
//const chromeOptions = new chrome.Options();
//chromeOptions.addArguments('--headless');
//const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
const driver = new Builder().forBrowser('chrome').build();

var server;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Index Screen', function () {
    it('Should show title: Banking Website', async () => {
        await driver.get('https://localhost:5050/'); // Navigate Sauce Demo
        const title = await driver.getTitle(); // Get the title of the web page
        expect(title).to.equal("Banking Website"); // Assert that title matches "Swag Labs"
    });

});

after(async function () {
    //await driver.quit();
    await server.close();
});