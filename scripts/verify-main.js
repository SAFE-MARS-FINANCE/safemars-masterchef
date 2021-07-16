require('dotenv').config();
const hre = require('hardhat');

const DYNA_TOKEN_ADDRESS = '';
const BUSD_ADDRESS = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
const WITHDRAW_WALLET_ADDRESS = '';
const PRESALE_ADDRESS = '';

const dynaTokenVerify = async () => {
  if (DYNA_TOKEN_ADDRESS) {
    await hre.run('verify:verify', {
      address: DYNA_TOKEN_ADDRESS
    })
  }
};

const presaleVerify = async () => {
  if (PRESALE_ADDRESS && DYNA_TOKEN_ADDRESS) {
    await hre.run('verify:verify', {
      address: PRESALE_ADDRESS,
      constructorArguments: [
        DYNA_TOKEN_ADDRESS,
        BUSD_ADDRESS,
        WITHDRAW_WALLET_ADDRESS
      ]
    })
  }
}

const main = async () => {
  await dynaTokenVerify();
  await presaleVerify();
  // await timeLockVerify();
  // await testTokensVerify();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
