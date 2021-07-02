import Account from "./Account";
import Ledger from "./Ledger";
import Transaction from "./Transaction";

export class TransferManager{
    ledger: Ledger;

    constructor(ledger: Ledger){
        this.ledger = ledger;
    }

    private validateTransfer(sourceAccount: Account, targetAccount: Account, amount: number){
        if (sourceAccount === targetAccount){
            return false;
        }
        if (sourceAccount.balance - amount < 0){
            return false;
        }
        if (amount <= 0){
            return false;
        }
        return true;
    }

    transfer(sourceAccount: Account, targetAccount: Account, amount: number){
        let result = false;
        const transaction = new Transaction(sourceAccount, targetAccount, amount, result);
        result = this.validateTransfer(sourceAccount, targetAccount, amount);
        if (result){
            targetAccount.balance += amount;
            sourceAccount.balance -= amount;
        }
        transaction.result = result;
        this.ledger.transactions.push(transaction);
        return result;
    }
}

export default TransferManager;