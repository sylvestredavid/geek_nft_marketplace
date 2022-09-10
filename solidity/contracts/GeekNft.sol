// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./utils/Counters.sol";
import "./ERC721/ERC721.sol";

contract GeekNft is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIds;
    address marketplaceAddress;

    constructor(address marketplaceAddress_, string memory name_, string memory symbol_)ERC721(name_, symbol_){
        marketplaceAddress = marketplaceAddress_;
    }

    function mint(string memory _tokenUri) public {
        tokenIds.increment();
        uint newTokenId = tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenUri(newTokenId, _tokenUri);
        emit NftMinted(newTokenId, msg.sender);
    } 

    function walletOfOwner(address _owner) public view returns (uint[] memory) {

        uint[] memory myNfts = new uint[](tokensOwnerCount[_owner]);
        uint nftIndex = 0;
        for (uint i = 1; i <= tokenIds.current(); i++) {
            if(tokenToOwner[i] == _owner) {
                myNfts[nftIndex] = i;
                nftIndex ++;
            }
        }

        return myNfts;
    }

}