import hre, { ethers } from "hardhat";

function advanceBlock() {
  return hre.network.provider.send("evm_mine");
}

// Advance the block to the passed height
async function advanceBlockTo(target: number) {
  const currentBlock = await latestBlock();
  const start = Date.now();
  let notified;
  if (target < currentBlock)
    throw Error(
      `Target block #(${target}) is lower than current block #(${currentBlock})`
    );
  while (target > (await latestBlock())) {
    if (!notified && Date.now() - start >= 5000) {
      notified = true;
    }
    await advanceBlock();
  }
}

// Returns the time of the last mined block in seconds
async function latest() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

async function latestBlock() {
  const block = await ethers.provider.getBlock("latest");
  return block.number;
}

// Increases ganache time by the passed duration in seconds
async function increase(duration: number) {
  await hre.network.provider.send("evm_increaseTime", [duration]);
  await advanceBlock();
}

/**
 * Beware that due to the need of calling two separate ganache methods and rpc calls overhead
 * it's hard to increase time precisely to a target point so design your test to tolerate
 * small fluctuations from time to time.
 *
 * @param target time in seconds
 */
async function increaseTo(target: number) {
  const now = await latest();

  if (target < now)
    throw Error(
      `Cannot increase current time (${now}) to a moment in the past (${target})`
    );
  const diff = target - now;
  return increase(diff);
}

function now() {
  return Math.floor(new Date().getTime() / 1000);
}

const duration = {
  now: function () {
    return Math.floor(new Date().getTime() / 1000);
  },
  seconds: function (val: number) {
    return val;
  },
  minutes: function (val: number) {
    return val * this.seconds(60);
  },
  hours: function (val: number) {
    return val * this.minutes(60);
  },
  days: function (val: number) {
    return val * this.hours(24);
  },
  weeks: function (val: number) {
    return val * this.days(7);
  },
  years: function (val: number) {
    return val * this.days(365);
  },
};

export default {
  advanceBlock,
  advanceBlockTo,
  latest,
  latestBlock,
  increase,
  increaseTo,
  now,
  duration,
};
