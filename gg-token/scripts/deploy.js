// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
    const provider = deployer.provider;

  const weiAmount = (await provider.getBalance(deployer.address)).toString();

  console.log("Account balance:", (weiAmount));

  // make sure to replace the "GoofyGoober" reference with your own ERC-20 name!
  const Token = await ethers.getContractFactory("GoofyGoober");
  const token = await Token.deploy();

  console.log("Token address:" + token.address);
  return token;
}

main()
    .then((token) => {
        console.log("Token: ", token);
        process.exit(0)
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
