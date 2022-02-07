// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');


  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // 1.-------------We get the Factory contract to deploy
  const OneXFactory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factoryAdd = "0x83B7E28E0EB2df7b321A8c1cE5B91068F7Fc8e1B"
  const oneXFactory = await OneXFactory.deploy(factoryAdd);
  await oneXFactory.deployed();
  console.log("OneXFactory deployed to:", oneXFactory.address);
  // 2.-------------We get the Factory contract already Deployed
  // const OneXFactory = await ethers.getContractFactory('UniswapV2Factory');
  // const oneXFactory = await OneXFactory.attach("0x4E55C0bFAeaC9732a583Dbf83c98dfdec629d8d7");






  // 3.-------------We get the Factory contract to deploy
  const pair = await oneXFactory.createPair("0xf22aB1217c41032ea8728AD1A50142418f46e2f1", "0xD4fC478637B08c4355D69d515D6C87e753A40B08");
  console.log("pair deployed to:", pair);
  // const acc = await await web3.eth.getAccounts();
  // console.log("Dev Account:", acc[0])
  console.log("Number of Pairs:", await oneXFactory.allPairsLength())
  const pairAddress = await oneXFactory.allPairs(0);
  console.log("Pair Address: ", pairAddress);

  // 4.-------------We get the Factory contract to deploy
  const OneXPair = await ethers.getContractFactory('UniswapV2Pair');
  const oneXPair = await OneXPair.attach(pairAddress);

  const token0 = await oneXPair.token0();
  const token1 = await oneXPair.token1();

  console.log("Pair Tokens:", token0, token1)

  console.log("Pair Reserves:", await oneXPair.getReserves())



  /* 5. -----------------WETH Deployment */
  const OneXWEth = await hre.ethers.getContractFactory("WETH9");
  console.log('Deploying OneXWEth...');
  const oneXWEth = await OneXWEth.deploy();
  await oneXWEth.deployed();
  console.log("OneXWEth deployed to:", oneXWEth.address);

  /* 6. -----------------OneXT Deployment */
  const TokenA = await hre.ethers.getContractFactory("OneXT");
  console.log('Deploying OneXT...');
  const tokenA = await TokenA.deploy();
  await tokenA.deployed();
  console.log("OneXT deployed to:", tokenA.address);

  /* 7. -----------------OneXV2 Deployment */
  const TokenB = await hre.ethers.getContractFactory("OneXV2");
  console.log('Deploying OneXV2...');
  const tokenB = await TokenB.deploy();
  await tokenB.deployed();
  console.log("OneXV2 deployed to:", tokenB.address);


  /* RouterV2 Deployment */
  const OneXRouter = await hre.ethers.getContractFactory("UniswapV2Router02");
  console.log("Deploying Router to Factory: ", oneXFactory.address);
  const oneXRouter = await OneXRouter.deploy(oneXFactory.address, oneXWEth.address);
  await oneXRouter.deployed();
  console.log("OneXRouter deployed to:", oneXRouter.address);

  // const oneXRouter = await OneXRouter.attach("0x87f03cD3443a19E972D1FA848070C396154A276e");

  // const tx = await oneXRouter.addLiquidity("0xf22aB1217c41032ea8728AD1A50142418f46e2f1", "0xD4fC478637B08c4355D69d515D6C87e753A40B08", 1, 1, 0, 0, "0xA5AE8D9DbfEefD2813f1F3eC36706541C38B23e2", 30000000000);
  const tx = await oneXRouter.addLiquidity(tokenA.address, tokenB.address, 1e6, 1e4, 1e6, 1e4, deployer.address, 30000000000);


  console.log("Added Liquidity:", tx);

  //   OneXFactory deployed to: 0x4E55C0bFAeaC9732a583Dbf83c98dfdec629d8d7
  // Deploying OneXWEth...
  // OneXWEth deployed to: 0x4F673287042c61e6CE9AF59065235a8E704e0B1B
  // Deploying OneXT...
  // OneXT deployed to: 0xf22aB1217c41032ea8728AD1A50142418f46e2f1
  // Deploying OneXV2...
  // OneXV2 deployed to: 0xD4fC478637B08c4355D69d515D6C87e753A40B08
  // Deploying Router to Factory: 0x4E55C0bFAeaC9732a583Dbf83c98dfdec629d8d7
  // OneXRouter deployed to: 0x87f03cD3443a19E972D1FA848070C396154A276e
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

