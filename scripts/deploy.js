// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');
require('dotenv').config();

const NATIVE_TOKEN_HOLDER_VAULT = '';
const MASTER_CHEF = '';
const SMARS_ADDRESS = '';
const DEV_ADDRESS = '';
const FEE_ADDRESS = '';
const MARS_PER_BLOCK = '300000000000000000';
const START_BLOCK = 8557015;

const deployNativeTokenHolderVault = async () => {
  const NativeTokenHolderVault = await hre.ethers.getContractFactory('NativeTokenHolderVault');
  const nativeTokenHolderVault = await NativeTokenHolderVault.deploy();
  await nativeTokenHolderVault.deployed();

  console.log('[deployNativeTokenHolderVault] nativeTokenHolderVault deployed to: ', nativeTokenHolderVault.address);
};

const deployMasterchef = async () => {
  if (SMARS_ADDRESS) {
    const MasterchefContract = await hre.ethers.getContractFactory('Masterchef');
    const masterchefContract = await MasterchefContract.deploy(SMARS_ADDRESS, DEV_ADDRESS, FEE_ADDRESS, MARS_PER_BLOCK, START_BLOCK, NATIVE_TOKEN_HOLDER_VAULT);

    await masterchefContract.deployed();
    console.log('[deployMasterchef] masterchefContract deployed to: ', masterchefContract.address);
  }
};

async function main() {
  await deployNativeTokenHolderVault();
  // await deployMasterchef();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
