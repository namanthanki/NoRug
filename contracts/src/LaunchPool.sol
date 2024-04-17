// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LaunchPool is ERC20, Ownable {
    constructor(
        address initialOwner, 
        string memory name, 
        string memory symbol, 
        address[] memory whitelists,
        uint256[] memory amounts
    )
        ERC20(name, symbol)
        Ownable(initialOwner)
    {
        for(uint8 i; i < whitelists.length; ++i) {
            if (whitelists.length != amounts.length) {
                revert("Mismatch lengths!");
            }
            if (whitelists[i] == address(0)) {
                revert("Found zero address!");
            }
            mint(whitelists[i], amounts[i]);
        }
    }

    function mint(address to, uint256 amount) internal {
        _mint(to, amount);
    }
}