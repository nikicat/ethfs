const { ethers, upgrades } = require("hardhat");

async function main() {
  const FileStorage = await ethers.getContractFactory("FileStorage");
  const fileStorage = await upgrades.deployProxy(FileStorage);
  await fileStorage.waitForDeployment();
  console.log("FileStorage deployed to:", await fileStorage.getAddress());
}

main();