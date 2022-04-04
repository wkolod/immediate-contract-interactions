# SmartWeave immediate contract interactions

Context: currently while deploying a new contract to mainnet and writing an interaction immediately afterwards, because the contract has not yet been fully seeded, we get the following error:\
`Unable to retrieve tx MRQAbOptas0A9tAWms2cyZmvo7l8BdF2pRZsx4w--9c. undefined. undefined`

Proposition: enable optimistic contract interactions

## Steps to reproduce the issue
- create a `.config-wallet.json` file containing the wallet to be used for posting transactions
- run `yarn install`
- run `npm test -t interaction.test.js`