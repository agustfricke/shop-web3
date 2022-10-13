require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/QcsqgtOiLVNItDothzleaos303HZr-r3',
      accounts: ['c011f5073bb74cf8c40f8ecb395bb88a7252bd94e61e6126786265b950d3cd63'],
    },
  },
};

