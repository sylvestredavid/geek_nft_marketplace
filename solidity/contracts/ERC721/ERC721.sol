// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


contract ERC721 {

    string private _name;
    string private _symbol;

    mapping(address => uint) tokensOwnerCount;
    mapping(uint => address) tokenToOwner;

    mapping(address => uint) tokensCreatorCount;
    mapping(uint => address) tokenToCreator;

    mapping(uint => string) public tokenToUri;

    event NftMinted(uint indexed tokenId, address from);
    event Transfer(address indexed from, address indexed to, uint indexed tokenId);

    constructor(string memory name_, string memory symbol_){
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view returns (string memory) {
        return _name;
    }
    
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function _safeMint(address _to, uint _tokenId) internal{
        require(tokenToCreator[_tokenId] == address(0), "token already exist");
        require(_to != address(0), "mint to the zero address");

        unchecked{
            tokensOwnerCount[_to]++;
            tokensCreatorCount[_to]++;
        }

        tokenToOwner[_tokenId] = _to;
        tokenToCreator[_tokenId] = _to;

        emit Transfer(address(0), _to, _tokenId);
    }

    function _setTokenUri(uint _tokenId, string memory _tokenUri) internal {
        require(tokenToCreator[_tokenId] != address(0), "token doesn't exist");
        tokenToUri[_tokenId] = _tokenUri;
    }

    function transferFrom(address _from, address _to, uint _tokenId) external {
        require(tokenToOwner[_tokenId] == _from, "Not called by the owner");
        require(_to != address(0), "ERC721: transfer to the zero address");

        unchecked{
            tokensOwnerCount[_from]--;
            tokensOwnerCount[_to]++;
        }

        tokenToOwner[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        address owner = tokenToOwner[_tokenId];
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }

    function balanceOf(address _owner) public view returns (uint) {
        return tokensOwnerCount[_owner];
    }

}