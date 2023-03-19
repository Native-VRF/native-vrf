// SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0;

interface INativeVRF {

    event RandomRequested(uint256 indexed requestId);
    event RandomFullfilled(uint256 indexed requestId, uint256 random);

    function MIN_DIFFICULTY() external view returns (uint256);
    function expectedFulfillTime() external view returns (uint256);
    function estimatedHashPower() external view returns (uint256);
    function difficulty() external view returns (uint256);

    function nBlockFulfillments(uint256 blockNumber) external view returns (uint256);
    function latestFulfillmentBlock() external view returns (uint256);

    function currentRequestId() external view returns (uint256);
    function latestFulfillId() external view returns (uint256);
    function randomResults(uint256 requestId) external view returns (uint256);
    function requestInitializers(uint256 requestId) external view returns (uint256);

    function minReward() external view returns (uint256);
    function rewards(uint256 requestId) external view returns (uint256);

    function requestRandom(uint256 numRequest) external payable returns (uint256[] memory);
    function fullfillRandomness(uint256[] memory _requestIds, uint256[] memory _randInputs, bytes[] memory _signatures) external;
    function getMessageHash(uint256 _requestId, uint256 _randInput) external view returns (bytes32);
    function convertSignatures(bytes[] memory _signatures) external pure returns (uint256[] memory);

}
