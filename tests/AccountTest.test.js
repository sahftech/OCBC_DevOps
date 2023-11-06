const { describe, it } = require("mocha");
const { expect } = require("chai");
const fs = require("fs").promises;
const { login } = require("../utils/AccountUtil");

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

});


