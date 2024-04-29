// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LaunchPool is ERC20, Ownable {
    uint256 saleStartTime;
    uint256 saleDuration;
    address[] whitelist;
    address[] assets;
    uint256[] amounts;
    uint8[] ratios;

    address[] buyers;
    mapping(address => uint256) buyerAmounts;

    constructor(
        address initialOwner,
        string memory name,
        string memory symbol,
        uint256 _saleStartTime,
        uint256 _saleDuration,
        address[] memory _whitelist,
        uint256[] memory _amounts,
        address[] memory _assets,
        uint8[] memory _ratios
    ) ERC20(name, symbol) Ownable(initialOwner) {
        saleStartTime = _saleStartTime;
        saleDuration = _saleDuration;
        whitelist = _whitelist;
        amounts = _amounts;
        assets = _assets;
        ratios = _ratios;
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
            IERC20(asset).transferFrom(msg.sender, address(this), requiredAmount), "Failed to transfer asset tokens!"
        );
        if (block.timestamp >= saleStartTime && block.timestamp <= saleStartTime + saleDuration) {
            mint(msg.sender, amount);
        } else {
            buyers.push(msg.sender);
            buyerAmounts[msg.sender] = amount;
        }
    }

    function airdrop() external onlyOwner {
        require(block.timestamp > saleStartTime + saleDuration, "Airdrop not available yet!");
        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i];
            uint256 amount = buyerAmounts[buyer];
            if (amount > 0) {
                mint(buyer, amount);
                delete buyerAmounts[buyer];
            }
        }
    }

    function mint(address to, uint256 amount) internal {
        _mint(to, amount);
    }
}
