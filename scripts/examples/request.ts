import { ContractReceipt } from "ethers";
import hre, { ethers } from "hardhat";
import { NativeVRFConsumer__factory } from "../../typechain";
import addressUtils from "../../utils/addressUtils";

const decordOutputs = (receipt: ContractReceipt) => {
    const events = receipt.events;
    if (!events) return [];
    return events.filter(e => e.event).map(e => [e.event, e.args]);
}

async function main() {
    const [signer] = await ethers.getSigners();
    const addressList = await addressUtils.getAddressList(hre.network.name);

    const nativeVRFConsumer = await NativeVRFConsumer__factory.connect(addressList['NativeVRFConsumer'], signer);

    const tx = await nativeVRFConsumer.generateRandom({ value: ethers.utils.parseEther('0.0001') });

    console.log("Submitted a transaction: ", tx.hash);

    const receipt = await tx.wait();

    console.log("Random number generation has been requested");
    console.log("Data: ", decordOutputs(receipt));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
