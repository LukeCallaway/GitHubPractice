function createAccount(pin, amount) {
    this.pin = pin;
    this.amount = amount ? amount : 0;

    this.checkBalance = (pin) => {
        if(pin === this.pin) return `$${this.amount}`;
        return 'Invalid PIN.';
    }
    this.deposit = function (pin, amount)  {
        if(pin === this.pin){
            this.amount += amount;
            return `Succesfully deposited $${amount}. Current balance: $${this.amount}.`
        }
        return 'Invalid PIN.'
    }
    this.withdraw = (pin, amount) => {
        if(pin === this.pin){
            if(amount <= this.amount){
                this.amount -= amount
                return `Succesfully withdrew $${amount}. Current balance: $${this.amount}.`;
            }
            return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
        }
        return 'Invalid PIN.';
    }
    this.changePin = (currentPin, updatedPin) =>{
        if(currentPin === this.pin){
            this.pin = updatedPin;
            return "PIN successfully changed!";
        }
        return 'Invalid PIN.';
    }
}

module.exports = { createAccount };
