// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {CErc20} from "../lib/clm/src/CErc20.sol";
import {Comptroller} from "../lib/clm/src/Comptroller.sol";

interface BaseV1Router01 {
    function addLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
}

// This implementation is developed for Testnet only.
contract LaunchPool is ERC20 {
    uint256 public maxSupply;
    uint256 public allocatedSupply;
    uint256 public reservedSupply;
    uint256 public creatorSupply;
    uint256 public saleStartTime;
    uint256 public saleDuration;
    address public creator;
    address[] public whitelist;

    // this is for testnet only - [NOTE, USDC, USDT, ETH, ATOM]
    address[5] public assets = [
        0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f,
        0xc51534568489f47949A828C8e3BF68463bdF3566,
        0x4fC30060226c45D8948718C95a78dFB237e88b40,
        0xCa03230E7FB13456326a234443aAd111AC96410A,
        0x40E41DC5845619E7Ba73957449b31DFbfB9678b2
    ];
    mapping(address => address) public cTokenMapping;
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
        // asset -> cAsset
        cTokenMapping[0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f] = 0x04E52476d318CdF739C38BD41A922787D441900c;
        cTokenMapping[0xc51534568489f47949A828C8e3BF68463bdF3566] = 0x9160c5760a540cAfA24F90102cAA14C50497d5b7;
        cTokenMapping[0x4fC30060226c45D8948718C95a78dFB237e88b40] = 0x3BEe0A8209e6F8c5c743F21e0cA99F2cb780D0D8;
        cTokenMapping[0xCa03230E7FB13456326a234443aAd111AC96410A] = 0x260fCD909ab9dfF97B03591F83BEd5bBfc89A571;
        cTokenMapping[0x40E41DC5845619E7Ba73957449b31DFbfB9678b2] = 0x90FCcb79Ad6f013A4bf62Ad43577eed7a8eb961B;
        // setting all bools to false
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

        clm_and_dex_calls();

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

    function clm_and_dex_calls() internal {
        // Minting cTokens = Supplying to CLM
        for (uint256 i = 0; i < assets.length; i++) {
            ERC20 underlying = ERC20(assets[i]);
            uint256 token_balance = underlying.balanceOf(address(this));
            if(token_balance > 0) {
                CErc20 cToken = CErc20(cTokenMapping[assets[i]]);
                underlying.approve(address(cToken), token_balance);
                assert(cToken.mint(token_balance) == 0);
            }
        }
        // Checking Liquidity - Testnet address is being used
        Comptroller troll = Comptroller(0xA51436eF5D46EE56B0906DeC620466153f7fb77e);
        (uint error, uint liquidity, uint shortfall) = troll.getAccountLiquidity(address(this));
        require(error == 0, "something went wrong");
        require(shortfall == 0, "negative liquidity balance");
        require(liquidity > 0, "there's not enough collateral");
        // Borrowing NOTE - Testnet cNOTE address is being used
        CErc20 cNOTE = CErc20(0x04E52476d318CdF739C38BD41A922787D441900c);
        uint amt_borrow = liquidity - 1;
        require(cNOTE.borrow(amt_borrow) == 0, "there is not enough collateral");
        // Creating new pair on DEX - Testnet address is being used for Router as well as for NOTE
        BaseV1Router01 testnet_dex = BaseV1Router01(0x463e7d4DF8fE5fb42D024cb57c77b76e6e74417a);
        (uint amountA, uint amountB, ) = testnet_dex.addLiquidity(address(this), 0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f, false, reservedSupply, amt_borrow, reservedSupply, amt_borrow, address(0), 16725205800);
        require(amountA == reservedSupply && amountB == amt_borrow, "couldn't add liquidity as required");
    }
}
