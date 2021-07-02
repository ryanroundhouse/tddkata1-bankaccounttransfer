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
    it('return a ledger entry on source search', () => {
        const ledger = new Ledger();
        const account = new Account();
        const sourceTransaction = new Transaction()
        const transactions = ledger.findTransactionsByAccount(account);

        expect(transactions.length).to.equal(1);
    });
});