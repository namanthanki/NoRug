// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {LaunchPool} from "./LaunchPool.sol";

contract LaunchPad {
    address[] launchPools;
    
//    this is for testnet only - [NOTE, USDC, USDT]
//    address[] public acceptableTokens = [0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f, 0xc51534568489f47949A828C8e3BF68463bdF3566, 0x4fC30060226c45D8948718C95a78dFB237e88b40];

    function createLaunchPool(
        string memory name,
        string memory symbol,
        string memory desc,
        uint256 saleStartTime,
        uint256 saleDuration,
        address[] memory whitelists,
        uint256[] memory amounts,
        address[] memory _assets,
        uint8[] memory _ratios
    ) external {

        require(saleStartTime > block.timestamp, "start time cannot be in past!");
        require(saleDuration >= (86400 * 5) && saleDuration <= (86400 * 7), "sale duration has to be between 5 to 7 days");

        // for (uint256 i = 0; i < _assets.length; i++) {
        //     bool found = false;
        //     for (uint256 j = 0; j < acceptableTokens.length; j++) {
        //         if (_assets[i] == acceptableTokens[j]) {
        //             found = true;
        //             break;
        //         }
        //     }
        //     require(found, "Asset not acceptable");
        // }

        LaunchPool pool =
            new LaunchPool(name, symbol, desc, saleStartTime, saleDuration, whitelists, amounts, _assets, _ratios);
        launchPools.push(address(pool));
    }

    function getLaunchPoolAddress(uint256 index) public view returns (address) {
        return launchPools[index];
    }
}
