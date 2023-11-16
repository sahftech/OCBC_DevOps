const { Builder } = require('selenium-webdriver');
const { uiTest } = require('./UITest.js');

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments("--window-size=1920,1080")
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();


uiTest(driver);
// before(async function () {
//     server = await new Promise((resolve) => {
//         server = app.listen(0, 'localhost', () => {
//             resolve(server);
//         });
//     })
// });

// describe('Testing Index Screen Chrome', function () {

//     this.timeout(100000);

//     it('Should show title: Banking Website', async () => {
//         await driver.get('http://localhost:5050/'); // Navigate Sauce Demo
//         const title = await driver.getTitle(); // Get the title of the web page
//         expect(title).to.equal("Banking Website"); // Assert that title matches "Swag Labs"
//     });

//     it('Should login successfully', async function () {
//         const baseUrl = 'http://localhost:' + server.address().port;
//         await driver.get(baseUrl);
    
//         // Locate and interact with the email field
//         const accessElement = await driver.findElement(By.id('access'));
//         await accessElement.click(); // Click on the element
//         await accessElement.sendKeys('john');
    
//         // Locate and interact with the email field
//         const pinElement = await driver.findElement(By.id('pin'));
//         await pinElement.click(); // Click on the element
//         await pinElement.sendKeys('123456');
    
//         // Locate and interact with the Login button
//         const loginButton = await driver.findElement(By.id('loginButton'));
//         await loginButton.click();
    
//         // Wait for the page to be redirected
//         await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
    
//         // Assert that the URL matches the expected URL
//         const currentUrl = await driver.getCurrentUrl();
//         expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
    
//     });



    

// });



// after(async function () {
//     await driver.quit();
//     await server.close();
//     process.exit(0);
// });