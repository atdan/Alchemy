const { assert, util: { inspect }} = require('chai');
const getBlockNumber = require('./getBlockNumber');
const getBalance = require('./getBalance');
const getNonce = require('./getNonce');

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
