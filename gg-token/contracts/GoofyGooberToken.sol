// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoofyGoober is ERC20 {
    uint constant _initial_supply = 99 * (10**18);
    constructor() ERC20("GoofyGoober", "GG") {
        _mint(msg.sender, _initial_supply);
    }
}
