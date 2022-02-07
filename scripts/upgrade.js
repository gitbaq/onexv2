// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main() {
    const Box = await ethers.getContractFactory('OneXT');
    console.log('Deploying OneX...');
    const box = await upgrades.deployProxy(Box, [], { kind: 'transparent' });
    await box.deployed();
    const v_num = await box.getVNum();
    const name1 = await box.name();


    console.log('OneX deployed to:', box.address, ' Version: ', v_num, 'Name:', name1);

    const BoxV2 = await ethers.getContractFactory('OneXV2');
    console.log('Upgrading OneX V2...');
    v2 = await upgrades.upgradeProxy(box.address, BoxV2);
    // v3 = await upgrades.upgradeProxy("0x0339a692E2dc5aEee6Ad9D4327A595B58236B20e", BoxV3);
    const v_num_2 = await v2.getVNum();
    const name2 = await v2.name();



    console.log('OneX upgraded', v2.address, ' Version: ', v_num_2, 'Name:', name2);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});