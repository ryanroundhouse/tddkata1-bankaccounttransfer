import Account from "./Account";

export class Transaction{
    sourceAccount: Account;
    targetAccount: Account;
    amount: number;
    result: boolean = false;

    constructor(sourceAccount: Account, targetAccount: Account, amount: number, result: boolean){
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        this.amount = amount;
        this.result = result;
    }

}

export default Transaction;