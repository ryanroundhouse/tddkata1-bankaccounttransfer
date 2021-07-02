import { Account } from "./Account";
import Transaction from "./Transaction";

export class Ledger{
    findTransactionsByAccount(account: Account) : Transaction[] {
        return [];
    }
    transactions: Transaction[] = []
}

export default Ledger;