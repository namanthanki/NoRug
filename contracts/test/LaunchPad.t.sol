// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {LaunchPad} from "../src/LaunchPad.sol";
import {LaunchPool} from "../src/LaunchPool.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LaunchPadTest is Test {
    LaunchPad public launchpad;
    address test = makeAddr("test");
    address note = 0x03F734Bd9847575fDbE9bEaDDf9C166F880B5E5f;
    string name = "Test Pool";
    string symbol = "TP";
    uint256 maxSupply = 10000e18;
    uint256 creatorSupply = 1000e18;
    uint256 saleStartTime = block.timestamp + 100;
    uint256 saleDuration = 86400 * 5;
    address[] whitelists = new address[](1);
    uint256[] amounts = new uint256[](1);
    uint256[5] ratios = [10e18, 10e18, 10e18, 10e18, 10e18];

    function setUp() public {
        launchpad = new LaunchPad();
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
    }

    function testFork() public {
        address poolAddress = launchpad.getLaunchPoolAddress(0);
        LaunchPool pool = LaunchPool(poolAddress);
        console.log("LaunchPool address: ", poolAddress);
        vm.warp(block.timestamp + 86410 * 6);
        deal(address(note), poolAddress, 10 ether);
        pool.airdrop();
        assertEq(pool.balanceOf(test), 100e18);
    }
}
