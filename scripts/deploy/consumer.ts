import hre, { ethers } from "hardhat";
import addressUtils from "../../utils/addressUtils";

async function main() {
    const addressList = await addressUtils.getAddressList(hre.network.name);

    const NativeVRFConsumer = await ethers.getContractFactory('NativeVRFConsumer');
    const nativeVRFConsumer = await NativeVRFConsumer.deploy(addressList['NativeVRF']);

    console.log({ nativeVRFConsumer: nativeVRFConsumer.address });

    await addressUtils.saveAddresses(hre.network.name, {
        NativeVRFConsumer: nativeVRFConsumer.address,
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
