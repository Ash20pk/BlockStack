// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoStackRewardNFT is ERC721, Ownable {

  uint public constant TIER_1_POINTS = 100;
  uint public constant TIER_2_POINTS = 200;
  uint public constant TIER_3_POINTS = 300;

  uint private tokenIdCounter; // Counter for managing token IDs

  constructor(address _initialOwner) ERC721("CryptoStackRewardNFT", "CSRNFT") Ownable(_initialOwner) {
    tokenIdCounter = 1; // Start the counter from 1
  }

  function mintNFT(address _to, uint _userPoints) external onlyOwner {
    require(_userPoints >= TIER_1_POINTS, "User points not sufficient for any tier");

    uint tokenId = tokenIdCounter++;
    
    if (_userPoints >= TIER_3_POINTS) {
      _safeMint(_to, tokenId);
    } else if (_userPoints >= TIER_2_POINTS) {
      _safeMint(_to, tokenId);
    } else if (_userPoints >= TIER_1_POINTS) {
      _safeMint(_to, tokenId);
    }
  }
}
