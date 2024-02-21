const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect, assert } = require('chai');
const {ethers} = require('hardhat');
const { parseEther, parseUnits } = ethers;

const passTime = (time) => ethers.provider.send('evm_increaseTime', [time]);
const oneWeek = 60 * 60 * 24 * 7;

describe('Switch', function () {
  const gasPrice = parseUnits("1", "gwei");
  const oneEther = parseEther("1");
  let contract;
  let owner, recipient, other;
  let recipientAddr;
  beforeEach(async () => {
    owner = ethers.provider.getSigner(0);
    recipient = ethers.provider.getSigner(1);
    recipientAddr = (await recipient).address;
    other = ethers.provider.getSigner(2);

    const Switch = await ethers.getContractFactory("Switch");
    contract = await Switch.deploy(recipientAddr, { value: oneEther });
    // await contract.deployed();
  });

  it('should not allow the recipient to ping', async () => {
    await assertThrows(
        contract.connect(recipient).ping(),
        "Expected transaction to revert! The recipient cannot ping the switch."
    );
  });

  it('should not allow some other account to ping', async () => {
    await assertThrows(
        contract.connect(other).ping(),
        "Expected transaction to revert! Other account cannot ping the switch."
    );
  });

  describe('after 70 weeks of inactivity', () => {
    beforeEach(async () => {
      await passTime(oneWeek * 70);
    });

    it('should allow the recipient to withdraw', async () => {
      const gasUsed = await contract.connect(recipient).withdraw({ gasPrice });
      console.log('Withdraw result:', gasUsed);

      await assertBalanceChange(
          recipientAddr, oneEther,
          gasUsed,
          "Expected the recipient to receive the deposit"
      );
    });
  });

  describe('after 40 weeks of inactivity since deployment', () => {
    beforeEach(async () => {
      await passTime(oneWeek * 40);
    });

    it('should not allow the recipient to withdraw', async () => {
      await assertThrows(
          contract.connect(recipient).withdraw(),
          "Expected transaction to revert! 40 weeks is not long enough inactivity."
      );
    });

    describe('after 40 more weeks of inactivity', () => {
      beforeEach(async () => {
        await passTime(oneWeek * 40);
      });

      it('should allow the recipient to withdraw', async () => {
        const gasUsed = await contract.connect(recipient).withdraw({ gasPrice });
        console.log('Withdraw result:', gasUsed);
        await assertBalanceChange(
            recipientAddr, oneEther,
            gasUsed,
            "Expected the recipient to receive the deposit"
        );
      });
    });

    describe('after pinging', () => {
      beforeEach(async () => {
        await contract.connect(owner).ping();
      });

      describe('after 40 more weeks of inactivity', () => {
        beforeEach(async () => {
          await passTime(oneWeek * 40);
        });

        it('should not allow the recipient to withdraw', async () => {
          await assertThrows(
              contract.connect(recipient).withdraw(),
              "Expected transaction to revert! 40 weeks is not long enough inactivity."
          );
        });

        describe('after 40 more weeks of inactivity', () => {
          beforeEach(async () => {
            await passTime(oneWeek * 40);
          });

          it('should allow the recipient to withdraw', async () => {
            const gasUsed = await contract.connect(recipient).withdraw({ gasPrice });
            // console.log('Withdraw result:', gasUsed);
            await assertBalanceChange(
                recipientAddr, oneEther,
                gasUsed,
                "Expected the recipient to receive the deposit"
            );
          });
        });
      });
    });
  });
});

async function assertBalanceChange(address, change, gasUsed, msg) {
  const balanceBefore = await ethers.provider.getBalance(address);
  console.log("Gas Used: " + gasUsed)
  const balanceAfter = await ethers.provider.getBalance(address);
  const gasInWei = parseUnits(String.valueOf(gasUsed), "gwei");
  assert.equal(
      change.toString(),
      (balanceAfter + (gasInWei) - (balanceBefore)).toString(),
      msg,
  );
}

async function assertThrows(promise, msg) {
  let ex;
  try {
    await promise;
  }
  catch (_ex) {
    ex = _ex;
  }
  assert(ex, msg);
}
