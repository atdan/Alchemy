const { assert } = require('chai');
const { wallet1, wallet2 } = require('./wallets');
const { Wallet, utils, BrowserProvider, parseEther, HDNodeWallet } = require('ethers');
const signaturePromise = require('./sign');
const donate = require('./donate');
const { PRIVATE_KEY, ganacheProvider } = require('./config');
const ethers = require('ethers');
const findEther = require('./findEther');


const FROM_ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";
const provider = new BrowserProvider(ganacheProvider);
const wallet = new Wallet(PRIVATE_KEY, provider);

function rpc(method) {
    return new Promise((resolve, reject) => {
        ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
            resolve();
        });
    });
}


describe('wallets', () => {
    describe('wallet 1', () => {
        it('should be an instance of wallet', () => {
            assert(wallet1 instanceof Wallet);
        });

        it('should unlock the expected address', () => {
            assert.equal(wallet1.address, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
    describe('wallet 2', () => {
        it('should be an instance of wallet', () => {
            assert(wallet2 instanceof HDNodeWallet);
        });

        it('should unlock the expected address', () => {
            assert.equal(wallet2.address, "0x88E9DD325BA8329dDD9825c1d24e8470b25575C1");
        });
    });
});

describe('signaturePromise', () => {
    it('should be an instance of Promise', () => {
        assert(signaturePromise instanceof Promise);
    });

    it('should resolve with a hexadecimal representation of the transaction', async () => {
        const hex = await signaturePromise;
        const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
        if(!matches) console.log(hex);
        assert(matches, 'did not match the expect hash output');
    });

    describe('parsed properties', () => {
        let parsed;
        before(async () => {
            const hex = await signaturePromise;
            parsed = utils.parseTransaction(hex);
        });

        it('should contain the to address', () => {
            assert.equal(parsed.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        });

        it('should contain the value', () => {
            assert.equal(parsed.value.toString(), "1000000000000000000");
        });

        it('should have the appropriate gas limit for transfers', () => {
            assert(parsed.gasLimit.eq(21000), "The gas limit should be 21000");
        });

        it('should derive the from address', () => {
            assert.equal(parsed.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
});

const charities = [
    '0xBfB25955691D8751727102A59aA49226C401F8D4',
    '0xd364d1F83827780821697C787A53674DC368eC73',
    '0x0df612209f74E8Aa37432c14F88cb8CD2980edb3',
]
const donationPromise = donate(PRIVATE_KEY, charities);

describe('donate', () => {
    it('should return an instance of Promise', () => {
        assert(donationPromise instanceof Promise);
    });
    it('should increase the balance of each charity', async () => {
        await donationPromise;
        for(let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            const balance = await provider.getBalance(charities[i]);
            assert.isAtLeast(+balance, +ethers.utils.parseEther("1.0"));
        }
    });
});
