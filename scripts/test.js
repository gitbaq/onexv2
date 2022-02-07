

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

    // We get the contract to deploy
    const address = '0xf22aB1217c41032ea8728AD1A50142418f46e2f1';
    const to_address = '0x9b5c0E1091E05F202B5dBeb89912eFD9C57f6A72';
    const Box = await ethers.getContractFactory('OneXV2');
    const box = await Box.attach(address);

    const name = await box.name();
    const addz = await box.address;
    const supply = await box.totalSupply() / 1e27;
    const tx = await box.transfer(to_address, '500000');
    const balance = await box.balanceOf(to_address);

    const tx2 = await box.transfer(to_address, '500000');
    const balance2 = await box.balanceOf(to_address);

    // const name = await box.name();
    // const name = await box.name();
    // const name = await box.name();
    // const name = await box.name();
    // const name = await box.name();

    console.log('Name: ', name.toString());
    console.log('address: ', addz.toString());
    console.log('supply: ', supply.toString(), ' BN');
    console.log('tx: ', tx);

    console.log('balance: ', balance.toString());
    console.log('balance2: ', balance2.toString());

    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());
    // console.log('Name', value.toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
