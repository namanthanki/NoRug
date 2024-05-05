// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {CErc20} from "../lib/clm/src/CErc20.sol";
import {Comptroller} from "../lib/clm/src/Comptroller.sol";
import {BaseV1Router01} from "../lib/clm/src/Swap/BaseV1-periphery.sol";

// This implementation is developed for Testnet only.
contract LaunchPool is ERC20 {
    string public project_desc;
    uint256 public maxSupply;
    uint256 public allocatedSupply;
    uint256 public reservedSupply;
    uint256 public creatorSupply;
    uint256 public saleStartTime;
    uint256 public saleDuration;
    address public creator;
    address[] public whitelist;

    // this is for testnet only - [NOTE, USDC, USDT, WCANTO, ATOM]
    address[5] public assets = [
        0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f,
        0xc51534568489f47949A828C8e3BF68463bdF3566,
        0x4fC30060226c45D8948718C95a78dFB237e88b40,
        0x04a72466De69109889Db059Cb1A4460Ca0648d9D,
        0x40E41DC5845619E7Ba73957449b31DFbfB9678b2
    ];
    uint256[] public amounts;

    // ratios denote how many tokens will a buyer get in exchange of existing token
    // for eg. ratios[0] = 10*10**18 meaning each user will get 10 tokens for each NOTE
    uint256[5] public ratios;

    bool public airdropped;
    bool public whitelistdropped;
    bool public creatordropped;

    address[] public buyers;
    mapping(address => bool) exists;
    mapping(address => uint256) buyerAmounts;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply,
        uint256 _creatorSupply,
        uint256 _allocatedSupply,
        uint256 _saleStartTime,
        uint256 _saleDuration,
        address _creator,
        address[] memory _whitelist,
        uint256[] memory _amounts,
        uint256[5] memory _ratios
    ) ERC20(name, symbol) {
        maxSupply = _maxSupply;
        creatorSupply = _creatorSupply;
        allocatedSupply = _allocatedSupply;
        reservedSupply = (_maxSupply - _allocatedSupply) / 2;
        saleStartTime = _saleStartTime;
        saleDuration = _saleDuration;
        creator = _creator;
        whitelist = _whitelist;
        amounts = _amounts;
        ratios = _ratios;
        airdropped = false;
        whitelistdropped = false;
        creatordropped = false;
    }

    function buy(uint8 asset_index, uint256 amount) external {
        require(amount > 0, "Invalid amount!");
        uint256 ratio = ratios[asset_index];
        uint256 requiredAmount = amount * ratio;
        require(allocatedSupply + amount <= maxSupply - reservedSupply, "token sale has maxed out");
        require(
            IERC20(assets[asset_index]).transferFrom(msg.sender, address(this), requiredAmount),
            "Failed to transfer asset tokens!"
        );
        if (block.timestamp >= saleStartTime && block.timestamp <= saleStartTime + saleDuration) {
            if (!exists[msg.sender]) {
                buyers.push(msg.sender);
                exists[msg.sender] = true;
                buyerAmounts[msg.sender] = amount;
                allocatedSupply += amount;
            } else {
                buyerAmounts[msg.sender] += amount;
                allocatedSupply += amount;
            }
        } else {
            revert("Token sale has ended!");
        }
    }

    function airdrop() external {
        require(airdropped == false, "airdrop already took place, check your wallet");
        require(block.timestamp > saleStartTime + saleDuration, "airdrop not available yet!");

        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i];
            uint256 amount = buyerAmounts[buyer];
            if (amount > 0) {
                mint(buyer, amount);
                delete buyerAmounts[buyer];
            }
        }
        airdropped = true;
    }

    function whitelistdrop() external {
        require(whitelistdropped == false, "whitelist drop already took place, check your wallet");
        require(block.timestamp > saleStartTime + saleDuration + (86400 * 90), "whitelist drop not available yet!");
        for (uint256 i = 0; i < whitelist.length; i++) {
            uint256 amount = amounts[i];
            mint(whitelist[i], amount);
        }
        whitelistdropped = true;
    }

    function creatordrop() external {
        require(creatordropped == false, "creator drop already took place");
        require(block.timestamp > saleStartTime + saleDuration + (86400 * 180), "creator drop not available yet!");
        mint(creator, creatorSupply);
        creatordropped = true;
    }

    function mint(address to, uint256 amount) internal {
        _mint(to, amount);
    }
}
