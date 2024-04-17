// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {LaunchPool} from "./LaunchPool.sol";

contract LaunchPad {
    function createLaunchPool(
        string memory name, 
        string memory symbol, 
        address[] memory whitelists,
        uint256[] memory amounts
    ) external {
        LaunchPool pool = new LaunchPool(msg.sender, name, symbol, whitelists, amounts);
    }
}