import { ethers, upgrades } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const DovCoin = await ethers.getContractFactory("DovCoin");
  const dovCoin = await upgrades.deployProxy(DovCoin, [deployer.address], {
    initializer: "initialize",
  });

  await dovCoin.waitForDeployment();
  console.log("DovCoin deployed to:", await dovCoin.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
