const ethers = require('ethers');
const { parseEther, utils } = ethers;
const { wallet1 } = require('./wallets');

const signaturePromise = wallet1.signTransaction({
    value: parseEther("1.0"),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    gasLimit: 0x5208,
});

module.exports = signaturePromise;
