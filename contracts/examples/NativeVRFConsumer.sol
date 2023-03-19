// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../interfaces/INativeVRF.sol";

contract NativeVRFConsumer {

    uint256[] public randomResults;
    uint256[] public requestIds;
    INativeVRF public nativeVRF;

    event RandomGenerated(uint256 indexed index, uint256 indexed requestId);
    event RandomRecorded(uint256 indexed index, uint256 indexed result);

    constructor(address nativeVRF_) {
        nativeVRF = INativeVRF(nativeVRF_);
    }

    function generateRandom() external payable {
        uint256[] memory ids = nativeVRF.requestRandom{value: msg.value}(1);
        requestIds.push(ids[0]);

        emit RandomGenerated(requestIds.length, ids[0]);
    }

    function recordRandomResults() external {
        uint256 requestLen = requestIds.length;
        uint256 resultLen = randomResults.length;

        uint256 numResults = requestLen - resultLen;
        uint256[] memory results = new uint256[](numResults);

        for (uint256 i = 0; i < numResults; i++) {
            uint256 index = i + resultLen;
            uint256 reqId = requestIds[index];
            uint256 result = nativeVRF.randomResults(reqId);
            results[i] = result;

            emit RandomRecorded(index, result);
        }

    }

}
