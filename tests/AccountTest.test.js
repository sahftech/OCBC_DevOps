const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { login, deposit, withdraw, balance } = require("../utils/AccountUtil");

describe("Testing Login Function", () => {
  const usersFilePath = "utils/accounts.json";
  var orgContent = "";

  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  it("Should login successfully", async () => {
    const req = {
      body: {
        access: "john",
        pin: "123456",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Login successful!");
      },
    };
    await login(req, res);
  });

  it("Invalid Access Code entered", async () => {
    const req = {
      body: {
        access: "jOhn",
        pin: "123456",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Incorrect pin code entered", async () => {
    const req = {
      body: {
        access: "john",
        pin: "134562",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Empty Field entered", async () => {
    const req = {
      body: {
        access: "",
        pin: "",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Incorrect pin code entered", async () => {
    const req = {
      body: {
        access: "john",
        pin: "134562",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Test Case Insensitive access code", async () => {
    const req = {
      body: {
        access: "jOhN",
        pin: "134562",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid credentials!");
      },
    };
    await login(req, res);
  });

  it("Should login unsuccessfully with wrong access", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const accessElement = await driver.findElement(By.id("access"));
    await accessElement.click(); // Click on the element
    await accessElement.sendKeys("joHn");

    // Locate and interact with the email field
    const pinElement = await driver.findElement(By.id("pin"));
    await pinElement.click(); // Click on the element
    await pinElement.sendKeys("123456");

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
  });

  it("Should login unsuccessfully with no access", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const accessElement = await driver.findElement(By.id("access"));
    await accessElement.click(); // Click on the element
    await accessElement.sendKeys("");

    // Locate and interact with the email field
    const pinElement = await driver.findElement(By.id("pin"));
    await pinElement.click(); // Click on the element
    await pinElement.sendKeys("123456");

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();

    // Wait for the page to be redirected
    //await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);

    // Assert that the URL matches the expected URL
    // const currentUrl = await driver.getCurrentUrl();
    // expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
  });

  it("Should login unsuccessfully with wrong pin", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const accessElement = await driver.findElement(By.id("access"));
    await accessElement.click(); // Click on the element
    await accessElement.sendKeys("john");

    // Locate and interact with the email field
    const pinElement = await driver.findElement(By.id("pin"));
    await pinElement.click(); // Click on the element
    await pinElement.sendKeys("123457");

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
  });

  it("Should login unsuccessfully with missing pin", async function () {
    const baseUrl = "http://localhost:" + server.address().port;
    await driver.get(baseUrl);

    // Locate and interact with the email field
    const accessElement = await driver.findElement(By.id("access"));
    await accessElement.click(); // Click on the element
    await accessElement.sendKeys("john");

    // Locate and interact with the email field
    const pinElement = await driver.findElement(By.id("pin"));
    await pinElement.click(); // Click on the element
    await pinElement.sendKeys("");

    // Locate and interact with the Login button
    const loginButton = await driver.findElement(By.id("loginButton"));
    await loginButton.click();
  });
});

describe("Testing Deposit Function", () => {
  const usersFilePath = "utils/accounts.json";
  var orgContent = "";

  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  it("Should deposit successfully", async () => {
    const req = {
      body: {
        access: "john",
        amount: "100",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Deposit successful!");
      },
    };
    await deposit(req, res);
  });

  it("Empty amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await deposit(req, res);
  });

  it("Negative amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "-100",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await deposit(req, res);
  });

  it("Zero amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "0",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await deposit(req, res);
  });

  it("Empty description", async () => {
    const req = {
      body: {
        access: "john",
        amount: "100",
        desc: "",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Deposit successful!");
      },
    };
    await deposit(req, res);
  });

  it("Empty access code", async () => {
    const req = {
      body: {
        access: "",
        amount: "100",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid operation!");
      },
    };
    await deposit(req, res);
  });
});

describe("Testing Withdraw Function", () => {
  const usersFilePath = "utils/accounts.json";
  var orgContent = "";

  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  it("Overdraft", async () => {
    const req = {
      body: {
        access: "john",
        amount: "100",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Withdrawal successful!");
      },
    };
    await withdraw(req, res);
  });

  it("Empty amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await withdraw(req, res);
  });

  it("Zero amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "0",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await withdraw(req, res);
  });

  it("Negative amount", async () => {
    const req = {
      body: {
        access: "john",
        amount: "-100",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Invalid amount!");
      },
    };
    await withdraw(req, res);
  });

  it("Overdraft", async () => {
    const req = {
      body: {
        access: "john",
        amount: "100000",
        desc: "test",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(201);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Withdrawal amount exceeds balance!");
      },
    };
    await withdraw(req, res);
  });
});

describe("Testing Balance Function", () => {
  const usersFilePath = "utils/accounts.json";
  var orgContent = "";

  beforeEach(async () => {
    orgContent = await fs.readFile(usersFilePath, "utf8");
    orgContent = JSON.parse(orgContent);
  });

  afterEach(async () => {
    await fs.writeFile(usersFilePath, JSON.stringify(orgContent), "utf8");
  });

  it("Empty access code", async () => {
    const req = {
      params: {
        access: "",
      },
    };
    const res = {
      status: function (code) {
        expect(code).to.equal(500);
        return this;
      },
      json: function (data) {
        expect(data.message).to.equal("Account not found!");
      },
    };
    await balance(req, res);
  });
});
