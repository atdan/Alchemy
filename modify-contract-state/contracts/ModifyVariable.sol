// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

contract ModifyVariable {
    uint public x;

    constructor(uint _x) {
        x = _x;
    }

    function modifyToLeet() public {
        x = 1337;
    }

}
