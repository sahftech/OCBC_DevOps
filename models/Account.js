class Account {
    constructor(name, nric, email, access, pin, type, contact, balance) {
        this.name = name;
        this.nric = nric;
        this.email = email;
        this.access= access
        this.pin = pin;
        this.type = type;
        this.contact = contact;
        this.balance = balance;
        this.transactions = [];

        const timestamp = new Date().getTime(); 
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}

module.exports = { Account };