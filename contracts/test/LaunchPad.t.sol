// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {LaunchPad} from "../src/LaunchPad.sol";
import {LaunchPool} from "../src/LaunchPool.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LaunchPadTest is Test {
    LaunchPad public launchpad;
    ERC20Mock mock;
    address test = makeAddr("test");
    string name = "Test Pool";
    string symbol = "TP";
    uint256 maxSupply = 10000e18;
    uint256 creatorSupply = 1000e18;
    uint256 saleStartTime = block.timestamp + 100;
    uint256 saleDuration = 86400 * 5;
    address[] whitelists = new address[](1);
    uint256[] amounts = new uint256[](1);
    uint256[5] ratios = [10 * 10 ** 18, 10 * 10 ** 18, 10 * 10 ** 18, 10 * 10 ** 18, 10 * 10 ** 18];

    function setUp() public {
        launchpad = new LaunchPad();
        vm.prank(test);
        mock = new ERC20Mock("mock", "mock", 100e18);
        whitelists[0] = test;
        amounts[0] = 100e18;
        ratios[0] = 1;
        vm.prank(test);
        launchpad.createLaunchPool(
            name, symbol, maxSupply, creatorSupply, saleStartTime, saleDuration, whitelists, amounts, ratios
        );
    }

    function testCreateLaunchPool() public view {
        address poolAddress = launchpad.getLaunchPoolAddress(0);
        assertTrue(poolAddress != address(0));

        LaunchPool pool = LaunchPool(poolAddress);
        assertEq(pool.name(), name);
        assertEq(pool.symbol(), symbol);
        assertEq(pool.saleStartTime(), saleStartTime);
        assertEq(pool.saleDuration(), saleDuration);
        assertEq(pool.whitelist(0), test);
        assertEq(pool.amounts(0), 100e18);
        assertEq(pool.assets(0), address(mock));
        assertEq(pool.ratios(0), 1);
    }

    function testBuyWithMockAsset() public {
        address poolAddress = launchpad.getLaunchPoolAddress(0);
        LaunchPool pool = LaunchPool(poolAddress);
        vm.startPrank(test);
        vm.warp(block.timestamp + 1000);
        mock.approve(poolAddress, 100e18);
        pool.buy(0, 100e18);
        vm.warp(block.timestamp + 86410 * 5);
        pool.airdrop();
        assertEq(pool.balanceOf(test), 100e18);
    }

    function testBuyAfterSaleEnded() public {
        address poolAddress = launchpad.getLaunchPoolAddress(0);
        LaunchPool pool = LaunchPool(poolAddress);
        vm.warp(block.timestamp + 86450 * 5);
        vm.startPrank(test);
        mock.approve(poolAddress, 100e18);
        vm.expectRevert("Token sale has ended!");
        pool.buy(0, 100e18);
    }
}

contract ERC20Mock is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}
