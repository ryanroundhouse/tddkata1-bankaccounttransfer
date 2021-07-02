import { expect } from "chai";
import Account from "../src/Account";
import Ledger from "../src/Ledger";
import TransferManager from "../src/TransferManager";

describe('transfer from one account to another', () => {
    it('add money to target bank account succeeds', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        sourceAccount.balance = 1; 
        const result = transferManager.transfer(sourceAccount, new Account(), 1);

        expect(result).to.be.true;
    });
    it('adds money to the target account', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(targetAccount.balance).to.equal(100);
    });
    it('removes money to the source account', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(sourceAccount.balance).to.equal(0);
    });
    it('fails if insufficient amount in source account', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(result).to.be.false;
    });
    it('doesnt add to target if insufficient amount in source account', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(targetAccount.balance).to.equal(0);
    });
    it('cant transfer negative amount', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, -100);

        expect(result).to.be.false;
    });
    it('doesnt remove from source if insufficient amount in source account', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(sourceAccount.balance).to.equal(0);
    });
    it('cant transfer from source to same target', () => {
        const transferManager = new TransferManager(new Ledger());
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        const result = transferManager.transfer(sourceAccount, sourceAccount, 100);

        expect(result).to.be.false;
    });
    it('successful transfer includes an entry in ledger', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions.length).to.equal(1);
    });
    it('successful transfer includes correcrt source account in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions[0].sourceAccount).to.equal(sourceAccount);
    });
    it('successful transfer includes correcrt target account in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions[0].targetAccount).to.equal(targetAccount);
    });
    it('successful transfer includes correcrt amount in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions[0].amount).to.equal(100);
    });
    it('successful transfer includes correcrt result in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions[0].result).to.be.true;
    });
    it('insufficient source funds results in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 0;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions.length).to.equal(1);
    });
    it('insufficient source funds results in failed ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 0;
        let targetAccount = new Account();
        const result = transferManager.transfer(sourceAccount, targetAccount, 100);

        expect(ledger.transactions[0].result).to.be.false;
    });
    it('same source and target transaction results in ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        const result = transferManager.transfer(sourceAccount, sourceAccount, 100);

        expect(ledger.transactions.length).to.equal(1);
    });
    it('same source and target transaction results in failed ledger entry', () => {
        let ledger = new Ledger();
        const transferManager = new TransferManager(ledger);
        let sourceAccount = new Account();
        sourceAccount.balance = 100;
        const result = transferManager.transfer(sourceAccount, sourceAccount, 100);

        expect(ledger.transactions[0].result).to.be.false;
    });
});