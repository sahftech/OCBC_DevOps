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

  it('Empty access code', async () => {
    const req = {
        body: {
            access: "",
            amount: "100",
            desc: "test"
        }
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(500);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal("Invalid operation!");
        }
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

  it('Overdraft', async () => {
    const req = {
        body: {
            access: "john",
            amount: "100",
            desc: "test"
        }
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(201);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal("Withdrawal successful!");
        }
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
      }
    };
    await withdraw(req, res);
  });

  it('Overdraft', async () => {
    const req = {
        body: {
            access: "john",
            amount: "100000",
            desc: "test"
        }
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(201);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal("Withdrawal amount exceeds balance!");
        }
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

  it('Empty access code', async () => {
    const req = {
        body: {
            access: ""
        }
    };
    const res = {
        status: function (code) {
            expect(code).to.equal(500);
            return this;
        },
        json: function (data) {
            expect(data.message).to.equal("Account not found!");
        }
    };
    await balance(req, res);
  }); 
});