import { expect } from "chai";
import Account from "../src/Account";
import Ledger from "../src/Ledger";
import Transaction from "../src/Transaction";

describe('ledger search', () => {
    it('return no entries on empty ledger search', () => {
        const ledger = new Ledger();
        const account = new Account();
        const transactions = ledger.findTransactionsByAccount(account);

        expect(transactions.length).to.equal(0);
    });
    it('return a ledger source entry on search', () => {
        const ledger = new Ledger();
        const sourceAccount = new Account();
        const targetAccount = new Account();
        const sourceTransaction = new Transaction(sourceAccount, targetAccount, 100, true);
        ledger.transactions.push(sourceTransaction);
        const transactions = ledger.findTransactionsByAccount(sourceAccount);

        expect(transactions.length).to.equal(1);
    });
    it('return a ledger target entry on search', () => {
        const ledger = new Ledger();
        const sourceAccount = new Account();
        const targetAccount = new Account();
        const sourceTransaction = new Transaction(sourceAccount, targetAccount, 100, true);
        ledger.transactions.push(sourceTransaction);
        const transactions = ledger.findTransactionsByAccount(targetAccount);

        expect(transactions.length).to.equal(1);
    });
});