require("dotenv").config();
const hre = require("hardhat")

const CONTRACT_ADDR = process.env.WINNER_CONTRACT_ADDRESS;
const MYCONTRACT_ADDR = process.env.DEPLOYED_CONTRACT_ADDRESS;

async function main() {

    const contract = await hre.ethers.getContractAt("Contract", MYCONTRACT_ADDR)

    await contract.callWinner(CONTRACT_ADDR)

    console.log('call winner event done')
}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})