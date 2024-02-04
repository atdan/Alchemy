// SPDX-License-Identifier: CC-BY-SA-4.0

// Version of Solidity compiler this program was written for
pragma solidity 0.8.23;

// implement Winner interface
interface IWinner {
    function attempt() external;
}

contract Contract {

    function callWinner(address winner) external {
        IWinner(winner).attempt();
    }

    // fallback function
    receive() external payable {}
}
