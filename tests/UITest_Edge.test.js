const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');


const edge = require('selenium-webdriver/edge');
const edgeOptions = new edge.Options();
edgeOptions.addArguments('--headless');
edgeOptions.addArguments("--window-size=1920,1080")
const driver = new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(edgeOptions).build();
//const driver = new Builder().forBrowser('firefox').build();
// const driver = new Builder().forBrowser('MicrosoftEdge').build();

var server;
before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Index Screen Edge', function () {

    this.timeout(100000);

    it('Should show title: Banking Website', async () => {
        await driver.get('http://localhost:5050/'); // Navigate Sauce Demo
        const title = await driver.getTitle(); // Get the title of the web page
        expect(title).to.equal("Banking Website"); // Assert that title matches "Swag Labs"
    });

    it('Should login successfully', async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);
    
        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
    
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
    
    });


});

describe("Testing Home Screen Edge", function () {
    this.timeout(100000);

    it("Should Show Account Name", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);
    
        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        
        // Assert that the Account Name matches the expected Account Name
        const accountName = await driver.findElement(By.id('accountName'));
        expect(await accountName.getText()).to.equal('John Tan');
    });

    it("Should show Account Email", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        
        // Assert that the Account Email matches the expected Account Email
        const accountEmail = await driver.findElement(By.id('accountEmail'));
        expect(await accountEmail.getText()).to.equal('john@gmail.com');
    });

    it("Should Open Deposit Modal", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

        // Locate and interact with the deposit button
        const depositButton = await driver.findElement(By.id('open-deposit'));
        await depositButton.click();

        // Check if modal is shown
        const modal = await driver.findElement(By.id('open-modal-deposit'));
        expect(await modal.isDisplayed()).to.equal(true);

    });

    it("Should Open Withdraw Modal", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

        // Locate and interact with the deposit button
        const depositButton = await driver.findElement(By.id('open-withdraw'));
        await depositButton.click();

        // Check if modal is shown
        const modal = await driver.findElement(By.id('open-modal-withdraw'));
        expect(await modal.isDisplayed()).to.equal(true);

    });

    it("Should close modal on deposit", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

        // Locate and interact with the deposit button
        const depositButton = await driver.findElement(By.id('open-deposit'));
        await depositButton.click();

        // Locate and input amount
        const amount = await driver.findElement(By.id('deposit-amount'));
        await amount.click(); // Click on the element
        await amount.sendKeys('100');

        // Locate and input description
        const description = await driver.findElement(By.id('deposit-desciption'));
        await description.click(); // Click on the element
        await description.sendKeys('Test Deposit');

        // Locate and interact with the deposit button
        const deposit = await driver.findElement(By.id('deposit-btn'));
        await deposit.click();

        // Check if modal is shown
        const modal = await driver.findElement(By.id('open-modal-deposit'));
        expect(await modal.isDisplayed()).to.equal(false);
    });

    it("Should close modal on withdraw", async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const accessElement = await driver.findElement(By.id('access'));
        await accessElement.click(); // Click on the element
        await accessElement.sendKeys('john');
    
        // Locate and interact with the email field
        const pinElement = await driver.findElement(By.id('pin'));
        await pinElement.click(); // Click on the element
        await pinElement.sendKeys('123456');
    
        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
    
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

        // Locate and interact with the deposit button
        const withdrawButton = await driver.findElement(By.id('open-withdraw'));
        await withdrawButton.click();

        // Locate and input amount
        const amount = await driver.findElement(By.id('withdraw-amount'));
        await amount.click(); // Click on the element
        await amount.sendKeys('100');

        // Locate and input description
        const description = await driver.findElement(By.id('withdraw-desciption'));
        await description.click(); // Click on the element
        await description.sendKeys('Test Withdraw');

        // Locate and interact with the deposit button
        const deposit = await driver.findElement(By.id('withdraw-btn'));
        await deposit.click();

        // Check if modal is shown
        const modal = await driver.findElement(By.id('open-modal-withdraw'));
        expect(await modal.isDisplayed()).to.equal(false);
    });
});



after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});