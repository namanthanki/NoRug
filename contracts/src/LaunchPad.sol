// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {LaunchPool} from "./LaunchPool.sol";

contract LaunchPad {
    address[] launchPools;

    modifier checkSupply(uint256 creatorSupply, uint256[] memory amounts, uint256 maxSupply) {
        uint256 totalSupply = creatorSupply;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalSupply += amounts[i];
        }
        require(
            totalSupply <= ((50 * maxSupply) / 100), "Whitelist + Creator supply should be less than or equal to 50%"
        );
        _;
    }

    modifier checkCreatorSupply(uint256 creatorSupply, uint256 maxSupply) {
        require(creatorSupply >= ((10 * maxSupply) / 100), "Creator supply should be minimum 10%");
        _;
    }

    modifier checkWhitelistSupply(uint256[] memory amounts, uint256 maxSupply) {
        for (uint256 i = 0; i < amounts.length; i++) {
            require(amounts[i] <= ((20 * maxSupply) / 100), "Supply of each whitelist should not be more than 20%");
        }
        _;
    }

    // this is for testnet only - [NOTE, USDC, USDT]
    // address[] public acceptableTokens = [0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f, 0xc51534568489f47949A828C8e3BF68463bdF3566, 0x4fC30060226c45D8948718C95a78dFB237e88b40];

    function createLaunchPool(
        string memory name,
        string memory symbol,
        string memory desc,
        uint256 maxSupply,
        uint256 creatorSupply,
        uint256 saleStartTime,
        uint256 saleDuration,
        address[] memory whitelists,
        uint256[] memory amounts,
        address[] memory _assets,
        uint8[] memory _ratios
    )
        external
        checkSupply(creatorSupply, amounts, maxSupply)
        checkCreatorSupply(creatorSupply, maxSupply)
        checkWhitelistSupply(amounts, maxSupply)
    {
        require(saleStartTime > block.timestamp, "start time cannot be in past!");
        require(
            saleDuration >= (86400 * 5) && saleDuration <= (86400 * 7), "sale duration has to be between 5 to 7 days"
        );
        require(maxSupply >= 100e18, "Total supply should not be less than 100");

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

        LaunchPool pool = new LaunchPool(
            name,
            symbol,
            desc,
            maxSupply,
            creatorSupply,
            saleStartTime,
            saleDuration,
            whitelists,
            amounts,
            _assets,
            _ratios
        );
        launchPools.push(address(pool));
    }

    function getLaunchPoolAddress(uint256 index) public view returns (address) {
        return launchPools[index];
    }
}
