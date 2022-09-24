pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Diffemon main smart contract
contract Diffemon is AccessControl, ERC721, ERC721URIStorage  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public sizeOfBoosterPack;
    uint256 public numCards;
    mapping (uint256 => uint256) public cards;
    mapping(address => uint256) public boostersAllowedToBuy;  

    string baseURI;  

    // Initializes the contract by setting a `name` and a `symbol` to the token collection.
    constructor () public ERC721('Diffemon NFT Collection', 'DIFF') {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        numCards = 100;
        sizeOfBoosterPack = 6;
        
        baseURI = "ipfs://bafybeicxklfbyhwgt3p4cuwd54to6edtfo7n6pnt6np3gsbgh4vmoxc73q";
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        _requireMinted(tokenId);

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(cards[tokenId]))) : "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to) internal returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }

    function setBaseURI(string memory uri) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        baseURI = uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
    
    function setBoosterSize(uint256 newBoosterSize) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        sizeOfBoosterPack = newBoosterSize;
    }
    
    function setNumCards(uint256 _numCards) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        numCards = _numCards;
    }
    
    // RNG, on-chain timestamp based
    function random(uint256 modulo, uint256 salt) private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp - 47 * salt, block.difficulty, msg.sender))) % modulo;
    }

    function allotBoosters(address to, uint256 numAllowed) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        boostersAllowedToBuy[to] += numAllowed;
    }
    
    function buyBooster() public {
        require(boostersAllowedToBuy[msg.sender] > 0, "Not enough boosters allowed to buy");
        boostersAllowedToBuy[msg.sender] -= 1;
        mintTokens(msg.sender);
    }
    
    function mint(uint256 cardId, address to) internal { 
        uint256 tokenId = safeMint(to);   
        cards[tokenId] = cardId;
    }   

    function mintTokens(address to) internal {
        for(uint8 i = 0; i < sizeOfBoosterPack; i++) {
            uint256 cardId = random(numCards, 1);
    
            mint(cardId, to);
        }
    } 
}
