const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("OneXV2", function () {
  it("Should return the total Supply once it's changed", async function () {

    const OneXRouter = await hre.ethers.getContractFactory("UniswapV2Router02");
    const oneXRouter = await OneXRouter.attach("0x87f03cD3443a19E972D1FA848070C396154A276e");
    const tx = await oneXRouter.addLiquidity("0xf22aB1217c41032ea8728AD1A50142418f46e2f1", "0xD4fC478637B08c4355D69d515D6C87e753A40B08", 1e10, 33e10, 1e8, 1e8, "0xA5AE8D9DbfEefD2813f1F3eC36706541C38B23e2", 30e12);
    console.log("Added Liquidity:", tx);
    // const OneXV2 = await ethers.getContractFactory("OneXV2");
    // const oneXV2 = await OneXV2.deploy();
    // await oneXV2.deployed();

    // expect(await oneXV2.name).to.equal("OneXV2");

    // const setGreetingTx = await oneXV2.mint(onexv2.address, 500);

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await oneXV2.name).to.equal("OneXV2");


  });
});
