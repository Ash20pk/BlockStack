const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy NFT contract
  const CryptoStackRewardNFT = await ethers.getContractFactory("CryptoStackRewardNFT");
  const nftContract = await CryptoStackRewardNFT.deploy(deployer.address);
  await nftContract.waitForDeployment();

  console.log("NFT Contract deployed to:", await nftContract.getAddress());

  // Deploy Main contract with NFT contract address as an argument
  const CryptoStackMain = await ethers.getContractFactory("CryptoStackMain");
  const mainContract = await CryptoStackMain.deploy(nftContract.getAddress());
  await mainContract.waitForDeployment();

  console.log("Main Contract deployed to:", await mainContract.getAddress());

  // Transfer ownership of the NFT contract to the Main contract
  await nftContract.transferOwnership(mainContract.getAddress());

  console.log("Ownership transferred to Main Contract:");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
