// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./utils/Counters.sol";
import "./utils/RenntrancyGuard.sol";
import "./ERC721/IERC721.sol";


contract GeekNftMarketPlace is ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _nftsSold;
    Counters.Counter private _nftsCount;

    uint public LISTING_FEE = 0.002 ether;
    address payable private _marketOwwner;

    mapping(uint => NFT) private _idToNFT;

    struct NFT {
        uint tokenId;
        uint price;
        address payable seller;
        address payable owner;
        address payable creator;
        bool listed;
    }

    event NFTListed(address nftContract, uint indexed tokenId, address indexed seller, address indexed owner, uint price);
    event NFTSold(address nftContract, uint indexed tokenId, address indexed seller, address indexed owner, uint price);

    constructor() {
        _marketOwwner = payable(msg.sender);
    }

    modifier priceIsGreaterThanZero(uint _price) {
        require(_price > 0, "Price must be at least 1 wei");
        _;
    }

    modifier valueIsEqualToFees() {
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee");
        _;
    }

    function getListingFee() public view returns (uint){
        return LISTING_FEE;
    }

    function getOwner(address _nftContract, uint _tokenId) public view returns (address){
        return IERC721(_nftContract).ownerOf(_tokenId);
    }

    // list the nft on the marketplace
    function listNFT(address _nftContract, uint _tokenId, uint _price) public payable nonReentrant priceIsGreaterThanZero(_price) valueIsEqualToFees{
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        _idToNFT[_tokenId] = NFT(
            _tokenId,
            _price,
            payable(msg.sender),
            payable(address(this)),
            payable(msg.sender),
            true
        );

        _nftsCount.increment();

        _marketOwwner.transfer(msg.value);

        emit NFTListed(_nftContract, _tokenId, msg.sender, address(this), _price);
    }

    // buy an nft
    function buyNft(address _nftContract, uint _tokenId) public payable nonReentrant{
        NFT storage nft = _idToNFT[_tokenId];

        require(nft.owner != address(0), "NFT not found");
        require(msg.value >= nft.price, "Not enough ether to cover asking price");

        address payable buyer = payable(msg.sender);
        nft.seller.transfer(msg.value);

        IERC721(_nftContract).transferFrom(address(this), buyer, _tokenId);
        nft.owner = buyer;
        nft.listed = false;

        _nftsSold.increment();

        emit NFTSold(_nftContract, _tokenId, nft.seller, buyer, msg.value);
    }

    // resell nft purchased from the marketplace
    function resellNFT(address _nftContract, uint _tokenId, uint _price) public payable nonReentrant priceIsGreaterThanZero(_price) valueIsEqualToFees{
        NFT storage nft = _idToNFT[_tokenId];

        require(nft.owner  != address(0), "NFT not found");

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        nft.seller = payable(msg.sender);
        nft.owner = payable(address(this));
        nft.listed = true;
        nft.price = _price;

        _nftsSold.decrement();
        
        emit NFTListed(_nftContract, _tokenId, msg.sender, address(this), _price);
    }

    // get msg.sender owned nfts
    function getMyOwnedNfts() public view returns (NFT[] memory) {
        uint nftsCount = _nftsCount.current();
        uint myNftsCount = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].owner == msg.sender) {
                myNftsCount ++;
            }
        }

        NFT[] memory myNfts = new NFT[](myNftsCount);
        uint nftIndex = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].owner == msg.sender) {
                myNfts[nftIndex] = _idToNFT[i];
                nftIndex ++;
            }
        }

        return myNfts;
    }

    // get msg.sender created nfts
    function getMyCreatedNfts() public view returns (NFT[] memory) {
        uint nftsCount = _nftsCount.current();
        uint myNftsCount = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].creator == msg.sender) {
                myNftsCount ++;
            }
        }

        NFT[] memory myNfts = new NFT[](myNftsCount);
        uint nftIndex = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].creator == msg.sender) {
                myNfts[nftIndex] = _idToNFT[i];
                nftIndex ++;
            }
        }

        return myNfts;
    }

    // get msg.sender listeds nfts
    function getMyListedNfts() public view returns (NFT[] memory) {
        uint nftsCount = _nftsCount.current();
        uint myNftsCount = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].seller == msg.sender && _idToNFT[i].listed) {
                myNftsCount ++;
            }
        }

        NFT[] memory myNfts = new NFT[](myNftsCount);
        uint nftIndex = 0;
        for (uint i = 1; i <= nftsCount; i++) {
            if(_idToNFT[i].seller == msg.sender && _idToNFT[i].listed) {
                myNfts[nftIndex] = _idToNFT[i];
                nftIndex ++;
            }
        }

        return myNfts;
    }

    function getListedNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _nftsCount.current();
        uint256 unsoldNftsCount = nftCount - _nftsSold.current();

        NFT[] memory listedNfts = new NFT[](unsoldNftsCount);
        uint nftsIndex = 0;
        for (uint i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].listed) {
                listedNfts[nftsIndex] = _idToNFT[i];
                nftsIndex++;
            }
        }
        return listedNfts;
    }
}