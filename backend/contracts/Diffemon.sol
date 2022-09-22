pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

struct DiffemonToken {
    uint256 _attack;
    string _element;
    uint256 _cardId;
}

// Diffemon main smart contract
contract Diffemon is AccessControl, ERC721, ERC721URIStorage  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Frequency values
    uint256[11] private classFreqs;
    uint256[11] private attackFreqs;
    uint256[6] private elementFreqs;
    
    // Elements
    string[7] private elements;
    
    // Current booster price
    uint256 private boosterPrice;
    uint256 private sizeOfBoosterPack;
    
    // Token 
    uint256 private numCards;
    uint256 private tokenCount;
    mapping (uint256 => DiffemonToken) private tokens;
    mapping(address => address) private boosterBuyingAllowed;  

    string baseURI;  

    // Initializes the contract by setting a `name` and a `symbol` to the token collection.
    constructor () public ERC721('Diffemon NFT Collection', 'DIFF') {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        numCards = 100;
        boosterPrice = 0.01 ether;
        sizeOfBoosterPack = 6;
        tokenCount = 0;
        
        classFreqs = [uint(10), uint(25), uint(50), uint(1000), uint(2000), uint(4000), uint(6000), uint(8000), uint(10000), uint(15000), uint(20000)]; // the rest remains for class 1
        attackFreqs = [uint(10), uint(25), uint(50), uint(100), uint(200), uint(400), uint(600), uint(800), uint(1000), uint(1500), uint(2000)]; // the rest remains for attack 1
        elementFreqs = [uint(10), uint(10), uint(10), uint(100), uint(250), uint(500)]; // the rest remains for element 1
        elements = ["Normal", "Grass", "Water", "Fire", "Electric", "Psychic", "Dragon"];

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

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(tokens[tokenId]._cardId))) : "";
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

    // Returns current ticket price
    function getBoosterPrice() public view returns (uint256) {
        return boosterPrice;
    }
    
    // Returns current ticket price
    function setBoosterPrice(uint256 newPrice) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        boosterPrice = newPrice;
    }
    
    // Returns current ticket price
    function setBoosterSize(uint256 newPrice) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE)) {
        boosterPrice = newPrice;
    }
    
    // RNG, on-chain timestamp based
    function random(uint256 modulo, uint256 salt) private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp - 47 * salt, block.difficulty, msg.sender))) % modulo;
    }
    
    // Selects random class
    function randomClass(uint256 salt) private view returns (uint256) {
        // Class frequencies
        uint256 number = random(100000, salt);
        
        uint256 border = 0;
        for (uint8 i = 0; i < 11; i++) {
            border += classFreqs[i];
            if (number < border) return 12 - i;
        }
        
        return 1;
    }
    
    // Selects random attack
    function randomAttack(uint256 salt) private view returns (uint256) {
        // Attack frequencies
        uint256 number = random(10000, salt);
        
        uint256 border = 0;
        for (uint8 i = 0; i < 11; i++) {
            border += attackFreqs[i];
            if (number < border) return 12 - i;
        }
        
        return 1;
    }
    
    // Selects random element
    function randomElement(uint256 salt) private view returns (uint256) {
        uint256 number = random(1000, salt);
        
        uint256 border = 0;
        for (uint8 i = 0; i < 5; i++) {
            border += elementFreqs[i];
            if (number < border) return 5 - i;
        }
        
        return 0;
    }
    
    // Buys and generates a boost
    function buyBooster() public payable {
        require(msg.value >= boosterPrice, "Not enough balance to buy a booster");
        
        mintTokens(msg.sender);
    }
    
    // Buys and generates a boost for free from owner
    function buyBooster(address to) public onlyRole(getRoleAdmin(DEFAULT_ADMIN_ROLE )) {
        mintTokens(to);
    }
    
    // Mints an NFT of custom characteristics
    function mint(DiffemonToken memory token, address to) internal { 
        uint256 tokenId = safeMint(to);   
        tokens[tokenId] = token;
    }   

    function mintTokens(address to) internal {
        for(uint8 i = 0; i < sizeOfBoosterPack; i++) {
            // Set random stats for the new token
            DiffemonToken memory token;
            uint256 class = randomClass(1);
            token._attack = randomAttack(3);
            token._element = elements[randomElement(4)];
            token._cardId = random(numCards, 4);
    
            mint(token, to);
        }
    } 
}
