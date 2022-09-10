// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

interface IERC721{
    function transferFrom(address _from, address _to, uint _tokenId) external;
    function ownerOf(uint256 _tokenId) external view returns (address);
}