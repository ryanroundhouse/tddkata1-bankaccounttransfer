import { Account } from "./Account";
import Transaction from "./Transaction";

export class Ledger{
    findTransactionsByAccount(account: Account) : Transaction[] {
        return this.transactions.filter((transaction) => {
            return transaction.sourceAccount === account || transaction.targetAccount === account;
        });
    }
    transactions: Transaction[] = [];
}

export default Ledger;