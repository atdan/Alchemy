const { Wallet, HDNodeWallet, BrowserProvider } = require('ethers');
const { ganacheProvider } = require('./config');


const provider = new BrowserProvider(ganacheProvider);

// create a wallet with a private key
const wallet1 = new Wallet("0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d");

// create a wallet from mnemonic
const wallet2 = Wallet.fromPhrase("plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice");

async function sendEther({ value, to }) {
    const rawTx = await wallet1.signTransaction({
        value, to,
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00
    });

    // broadcast the transaction to the ethereum network
    return provider.sendTransaction(rawTx);
}

module.exports = {
    wallet1,
    wallet2,
    sendEther
}
