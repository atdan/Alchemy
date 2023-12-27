const { assert, util: { inspect }} = require('chai');
const getBlockNumber = require('./getBlockNumber');
const getBalance = require('./getBalance');
const getNonce = require('./getNonce');
const getTotalTransactions = require('./getTotalTransactions');
const getTotalBalance = require('./getTotalBalance');

const addresses = [
    '0x830389b854770e9102eb957379c6b70da4283d60',
    '0xef0613ab211cfb5eeb5a160b65303d6e927f3f85',
    '0x5311fce951684e46cefd804704a06c5133030dff',
    '0xe01c0bdc8f2a8a6220a4bed665ceeb1d2c716bcb',
    '0xf6c68965cdc903164284b482ef5dfdb640d9e0de'
];

describe('getBlockNumber', function () {
    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
        const parsed = parseInt(blockNumber);
        assert(!isNaN(parsed), `We expected you to return a block number, here is what you returned: ${inspect(blockNumber)}`);
        assert.isAbove(parseInt(blockNumber), 0xfde2cf);
    });
});

describe('getBalance', () => {
    it('should find the balance of the address with 10 ether', async () => {
        const balance = await getBalance("0x3bfc20f0b9afcace800d73d2191166ff16540258");
        const parsed = parseInt(balance);
        assert(!isNaN(parsed), `We expected you to return a balance, here is what you returned: ${inspect(balance)}`);
        assert.isAbove(parsed, 0x40db451e4e74a0311e90);
    });
});

describe('getNonce', () => {
    it('should get the nonce for the zero address', async () => {
        const nonce = await getNonce("0x0000000000000000000000000000000000000000");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.equal(parsed, 0);
    });

    it('should get the nonce for vitalik.eth', async () => {
        const nonce = await getNonce("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.isAbove(parsed, 1015);
    });
});

describe('getTotalTransactions', () => {
    it('should work for an empty block', async () => {
        const numTx = await getTotalTransactions('0x' + (12379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 0);
    });

    it('should work for a recent block', async () => {
        const numTx = await getTotalTransactions('0x' + (16642379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 206);
    });
});

describe('getTotalBalance', () => {
    it('should find the total balance of all the addresses', async () => {
        const totalBalance = await getTotalBalance(addresses);
        const parsed = parseInt(totalBalance);
        assert(!isNaN(parsed), `We expected you to return a total balance, here is what you returned: ${inspect(totalBalance)}`);
        assert.isAtLeast(parsed, 250000000000000000);
    });
});
