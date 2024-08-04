
task("upgrade", "Upgrade contract")
  .addPositionalParam("address")
  .setAction(async (taskArgs, hre) => {
    const FileStorage = await hre.ethers.getContractFactory("FileStorage");
    await hre.upgrades.upgradeProxy(taskArgs.address, FileStorage);
    const newAddress = await hre.upgrades.erc1967.getImplementationAddress(taskArgs.address);
    console.log("FileStorage upgraded", newAddress);
  });

task("deploy", "Deploy contract")
  .setAction(async (taskArgs, hre) => {
    const FileStorage = await hre.ethers.getContractFactory("FileStorage");
    const fileStorage = await hre.upgrades.deployProxy(FileStorage);
    await fileStorage.waitForDeployment();
    console.log("FileStorage deployed to:", await fileStorage.getAddress());
  });
  