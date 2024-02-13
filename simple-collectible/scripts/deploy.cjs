const { ethers, JsonRpcProvider } = require('ethers');
require('dotenv').config();

async function main() {

  const url = process.env.GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("Contract");

  const provider = new JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider.provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let emitter = await factory.deploy();

  await emitter.waitForDeployment();

    console.log("Emitter address:", await emitter.getAddress());

    // Call the callWinner function of the EventWinner contract and pass in the address of the winner contract
    const tx = await emitter.callWinner(process.env.WINNER_CONTRACT_ADDRESS);

    // Wait for the transaction to be confirmed on the blockchain
    await tx.wait();

    console.log(`Winner Emitter txn ::: ${tx}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

//Faucet deploy address: 0xA8e4b84a3572820Ee8a10Fd9408a4c9dDbD86419
