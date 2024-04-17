// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LaunchPool is ERC20, Ownable {
    
    address[] whitelist;
    address[] assets;
    uint256[] amounts;
    uint8[] ratios;

    constructor(
        address initialOwner, 
        string memory name, 
        string memory symbol, 
        address[] memory _whitelist,
        uint256[] memory _amounts,
        address[] memory _assets,
        uint8[] memory _ratios
    )
        ERC20(name, symbol)
        Ownable(initialOwner)
    {
        whitelist = _whitelist;
        amounts = _amounts;
        assets = _assets;
        ratios = _ratios;
        for(uint8 i; i < _whitelist.length; ++i) {
            if (_whitelist.length != _amounts.length) {
                revert("Mismatch lengths!");
            }
            if (_whitelist[i] == address(0)) {
                revert("Found zero address!");
            }
            mint(_whitelist[i], _amounts[i]);
        }
    }

    function buy(address asset, uint256 amount) external {
        require(amount > 0, "Invalid amount!");
        uint8 ratio;
        bool assetFound;
        for (uint8 i; i < assets.length; ++i) {
            if (assets[i] == asset) {
                ratio = ratios[i];
                assetFound = true;
                break;
            }
        }
        require(assetFound, "Asset not found!");
        uint256 requiredAmount = amount * ratio;
        require(
            IERC20(asset).transferFrom(msg.sender, address(this), requiredAmount),
            "Failed to transfer asset tokens!"
        );
        mint(msg.sender, amount);
    }

    function mint(address to, uint256 amount) internal {
        _mint(to, amount);
    }
}