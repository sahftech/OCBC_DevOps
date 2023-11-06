const { Account } = require('../models/Account');
const fs = require('fs').promises;
const moment = require('moment');

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function login(req, res) {
    try {
        const access = req.body.access;
        const pin = req.body.pin;

        const allAccounts = await readJSON('utils/accounts.json');

        var validCredentials = false;

        for (var i = 0; i < allAccounts.length; i++) {
            var currUser = allAccounts[i];
            if (currUser.access == access && currUser.pin == pin)
                validCredentials = true;
        }

        if (validCredentials) {
            return res.status(201).json({ message: 'Login successful!' });
        } else {
            return res.status(500).json({ message: 'Invalid credentials!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function deposit (req, res) {
    try {
        const access = req.body.access;
        const amount = req.body.amount;
        const desc = req.body.desc;

        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

        const allAccounts = await readJSON('utils/accounts.json');

        var accountFound = false;

        for (var i = 0; i < allAccounts.length; i++) {
            var currUser = allAccounts[i];
            if (currUser.access == access) {
                currUser.transactions.push({
                    "datetime": formattedDate,
                    "type": "D",
                    "desc": desc,
                    "amount": parseFloat(amount)
                })
                currUser.balance = currUser.balance + parseFloat(amount);
                accountFound = true;
            }      
        }

        if (accountFound) {    
            await fs.writeFile('utils/accounts.json', JSON.stringify(allAccounts), 'utf8');   
            return res.status(201).json({ message: 'Deposit successful!' });
        } else {
            return res.status(500).json({ message: 'Invalid operation!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function withdraw (req, res) {
    try {
        const access = req.body.access;
        const amount = req.body.amount;
        const desc = req.body.desc;

        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

        const allAccounts = await readJSON('utils/accounts.json');

        var accountFound = false;

        for (var i = 0; i < allAccounts.length; i++) {
            var currUser = allAccounts[i];
            if (currUser.access == access) {
                currUser.transactions.push({
                    "datetime": formattedDate,
                    "type": "W",
                    "desc": desc,
                    "amount": parseFloat(amount)
                })
                currUser.balance = currUser.balance - parseFloat(amount);
                if (currUser.balance < 0) {
                    return res.status(201).json({ message: 'Withdrawal amount exceeds balance!' });
                }
                accountFound = true;
            }
                
        }

        if (accountFound) {    
            await fs.writeFile('utils/accounts.json', JSON.stringify(allAccounts), 'utf8');   
            return res.status(201).json({ message: 'Withdrawal successful!' });
        } else {
            return res.status(500).json({ message: 'Invalid operation!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function transfer (req, res) {
    try {
        const sender = req.body.sender;
        const receiver = req.body.receiver;
        const amount = req.body.amount;
        const desc = req.body.desc;

        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');

        const allAccounts = await readJSON('utils/accounts.json');

        var senderFound = false;
        var receiverFound = false;

        for (var i = 0; i < allAccounts.length; i++) {
            var currUser = allAccounts[i];
            if (currUser.access == sender) {
                currUser.transactions.push({
                    "datetime": formattedDate,
                    "type": "W",
                    "desc": desc + " - " + receiver,
                    "amount": parseFloat(amount)
                })
                currUser.balance = currUser.balance - parseFloat(amount);
                if (currUser.balance < 0) {
                    return res.status(201).json({ message: 'Withdrawal amount exceeds balance!' });
                }
                senderFound = true;
            }
            if (currUser.access == receiver) {
                currUser.transactions.push({
                    "datetime": formattedDate,
                    "type": "D",
                    "desc": desc + " - " + sender,
                    "amount": parseFloat(amount)
                })
                currUser.balance = currUser.balance + parseFloat(amount);
                receiverFound = true;
            }  
        }

        if (senderFound && receiverFound) {    
            await fs.writeFile('utils/accounts.json', JSON.stringify(allAccounts), 'utf8');   
            return res.status(201).json({ message: 'Transfer successful!' });
        } else {
            return res.status(500).json({ message: 'Invalid operation!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function balance (req, res) {
    try {
        const access = req.params.access;

        const allAccounts = await readJSON('utils/accounts.json');

        var index = -1;

        for (var i = 0; i < allAccounts.length; i++) {
            var currUser = allAccounts[i];
            if (currUser.access == access) { 
                index = i;
            }      
        }

        if (index != -1) {    
            await fs.writeFile('utils/accounts.json', JSON.stringify(allAccounts), 'utf8');   
            return res.status(201).json(allAccounts[index]);
        } else {
            return res.status(500).json({ message: 'Account not found!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, login, deposit, withdraw, balance, transfer
};
