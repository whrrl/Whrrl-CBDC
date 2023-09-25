const { ethers } = require("hardhat");
// const contract = require("../TestDeployment.json");

async function main() {
    const [owner] = await ethers.getSigners()

    // let CONSTANTS = {
    //     TokenDisributor : contract.TokenDistributor,
    //     BoardRoom : contract.BoardRoom,
    //     Treasury : contract.Treasury,
    //     GenesisRewardPool : contract.GenesisRewardPool,
    //     ShareRewardPool : contract.ShareRewardPool,
    //     Bond : contract.Bond,
    //     Native : contract.Native,
    //     ShareToken : contract.Share,
    //     ShareRewardPoolStartTime: contract.ShareRewardPoolTime,
    //     ShareRewardPoolStartTime2: 1694545200,
    //     Oracle : contract.Oracle
    // }

    let CBDC = await ethers.getContractAt("DigitalRupee", "0xe1B979034Cc4eF5729935Cc7703FA3e38A73FD05");
    let tx1 = await CBDC.connect(owner).mint(
        owner.address,
        "1000000000000000000000"
    );
    console.log("%c Line:64 🍪 tx1", "color:#2eafb0", tx1);

    // let CBDC = await ethers.getContractAt("DigitalRupee", "0xe1B979034Cc4eF5729935Cc7703FA3e38A73FD05");
    // let tx1 = await CBDC.connect(owner).transfer(
    //     "0x31c54c475dB01641cF24f2B78b0564425154a8a7",
    //     "1000000000000000000"
    // );
    // console.log("%c Line:64 🍪 tx1", "color:#2eafb0", tx1);

    // let CBDC = await ethers.getContractAt("DigitalRupee", "0xe1B979034Cc4eF5729935Cc7703FA3e38A73FD05");
    // let tx1 = await CBDC.connect(owner).transfer(
    //     "0x78B9151cA6367E34130Aa3238D1c349B12fE978E",
    //     "1000000000000000000"
    // );
    console.log("%c Line:64 🍪 tx1", "color:#2eafb0", tx1);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});