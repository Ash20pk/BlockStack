// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoStackRewardNFT is ERC721, Ownable {

  uint public constant TIER_1_POINTS = 100;
  uint public constant TIER_2_POINTS = 200;
  uint public constant TIER_3_POINTS = 300;

  struct NFT {
        uint tokenID;
        address owner;
    }

  struct NFTMetadata {
    string name;
    string imageURI;
    string description;
    }

  mapping(uint => NFTMetadata) public nftMetadata;

  NFT[] public nfts;

  uint private tokenIdCounter; // Counter for managing token IDs

  constructor(address _initialOwner) ERC721("CryptoStackRewardNFT", "CSRNFT") Ownable(_initialOwner) {
    tokenIdCounter = 1; // Start the counter from 1
  }

  function returnNFTCount() public view returns(uint) {
        return nfts.length;
  }

  function setNFTMetadata(uint tier, string memory name, string memory imageURI, string memory description) external onlyOwner {
    require(tier >= 1 && tier <= 3, "Invalid tier");
    nftMetadata[tier] = NFTMetadata(name, imageURI, description);
 }

  function mintNFT(address _to, uint _userPoints) external onlyOwner {
    require(_userPoints >= TIER_1_POINTS, "User points not sufficient for any tier");

    uint tokenId = tokenIdCounter++;
    uint tier;

    if (_userPoints >= TIER_3_POINTS) {
        tier = 3;
    } else if (_userPoints >= TIER_2_POINTS) {
        tier = 2;
    } else if (_userPoints >= TIER_1_POINTS) {
        tier = 1;
    }

    _safeMint(_to, tokenId);
    nfts.push(NFT(tokenId, _to));

}

}
