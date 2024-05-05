# NoRug
#### Innovative Launchpad Solution with Canto at Heart🩵🚀

- [Documentation](https://vantec.gitbook.io/norug)
- [Video Demo](https://youtu.be/qyQyDG6dTmg)
- [Pitch Deck](https://gamma.app/docs/NoRug-mdl22kzww4l098o)
- [Website WIP!](https://no-rug.vercel.app/)

## Table of Contents

1. Problem Statement
2. Project Description
3. Tech Stack
4. Contracts

## Problem Statement

Launchpads help projects raise funds by offering tokens to investors in exchange for capital. This process, often called a "Token Sale," facilitates the collection of funds from individuals interested in a project, simplifying the process for project teams and investors. Canto, as a permissionless blockchain focused on decentralized finance (DeFi), needs a launchpad to nurture projects within its ecosystem, ensuring they align with the principles of liquidity as a free public good.

## Project Description

NoRug is a launchpad made exclusively for Canto, providing incentives for project developers conducting token sales while protecting investors from rug pulls. Our platform focuses on creating liquidity pairs on Canto's DEX against NOTE through Initial DEX Offerings (IDOs), leading to several positive impacts on Canto's ecosystem, such as:

- Increased utility and demand for RWAs
- Increment in TVL on CLM
- Increased circulating supply for NOTE
- Increased TVL on DEX in the form of liquidity
- Increased volume of NOTE traded

NoRug is dedicated to ensuring legitimate token sales and safeguarding investors from frauds, scams, and rug pulls.

### Buy with RWAs

**RWAs**: Real World Asset tokens represent ownership or fractional ownership of tangible assets in the real world. NoRug aims to increase the utility of these tokens by accepting them for token sales, thereby increasing their demand and circulation.

### Lending Market Interactions

NoRug's Token Sales allow users to participate with multiple tokens, including RWAs. Proceeds from token sales are supplied to Canto's CLM, increasing TVL and liquidity. The contracts then borrow NOTE from CLM to add liquidity, increasing the circulating supply of NOTE.

### Adding Pair to DEX

From the borrowed NOTE and reserved tokens, new TOKEN/NOTE pairs are created on Canto's DEX, increasing the liquidity and utility of NOTE. The LP tokens of the new pair are minted to zero address.

### Incentives for Creators

NoRug shares Contract Secured Revenue (CSR) with creators. Treasury contract accumulates CSR, allowing creators to earn incentives for creating token sales on NoRug.

## Tech Stack

Leveraging below technologies of Canto - 

1. **NOTE** - A key element in our platform.
2. **CLM** - Canto Lending Market.
3. **DEX** - Canto's decentralized exchange.
4. **RWAs** - Participate in Token Sales using RWAs.
5. **CSR** - Incentives for launching tokens on NoRug.

Below are the details of how the project is built - 

- Backend : Solidity (Foundry)
- Frontend : ViteJS

## Contracts

#### LaunchPad.sol

It manages the creation and tracking of LaunchPool instances for token sales on a blockchain platform. It enables users to set up a new LaunchPool by specifying token characteristics like name, symbol, and supply details. The contract ensures conditions such as future start times, appropriate sale durations (5 to 7 days), and supply constraints (e.g., minimum total supply of 100 tokens, creator supply not less than 10% of total). It also manages whitelisted addresses and their allocated amounts, ensuring no group exceeds set limits, thus facilitating fair and regulated token distribution as per defined covenants.

#### LaunchPool.sol

The current implementation is designed for the Testnet chain, serves as a decentralized platform facilitating token sales. This ERC20-based contract manages the issuance of tokens against NOTE, USDC, USDT, ETH, and ATOM. It supports various functions, including buying tokens during a sale, allocating tokens through specific airdrops, and interacting with collateralized lending markets (CLM). It enables adding liquidity to decentralized exchanges (DEX) by handling complex asset interactions and ensuring compliance with supply ratios and distribution rules of lockin timings.

#### Treasury.sol

This contract will be created in future which will manage the CSR distribution amongst the creators.