// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./BlockStackRewardNFT.sol"; // Import the NFT contract

contract BlockStackMain {

  BlockStackRewardNFT public nftContract; // Instance of the NFT contract

  uint public userCount;
  uint public questionCount;
  uint public answerCount;

  struct User {
    uint userPoints;
    address userAddress;
    string userName;
  }

  struct Question {
    uint id;
    address questionaireAddress;
    bool isAnswered;
    string questionString;
    uint256 upvotes;
    uint256 downvotes;
    uint256 timestamp;
  }

  struct Answer {
    uint id;
    uint questionId;
    address replierAddress;
    string answerString;
    uint256 upvotes;
    uint256 downvotes;
    uint256 timestamp;
  }
  
  User[] public users;
  Question[] public questions;
  Answer[] public answers;

  event registeredNewUser(address);
  event createdNewQuestion(uint, address);
  event answeredQuestion(uint, uint, address);
  event upvotedQuestion(uint, address);
  event downvotedQuestion(uint, address);
  event upvotedAnswer(uint, address);
  event downvotedAnswer(uint, address);
  event NFTMinted(address indexed owner); // Event for NFT minting

  // NFT tiers based on user points
  uint constant TIER_1_THRESHOLD = 100;
  uint constant TIER_2_THRESHOLD = 200;
  uint constant TIER_3_THRESHOLD = 300;

  constructor(address _nftContractAddress) {
    nftContract = BlockStackRewardNFT(_nftContractAddress);
  }

  function isRegisteredUser(address _user) public view returns(bool) {
    bool registeredUser;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user) {
        registeredUser = true;
      }
    }
    return registeredUser;
  }

  function isFrequentContributor(address _user) public view returns(bool) {
    bool frequentContributor;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user && users[i].userPoints > 100) {
        frequentContributor = true;
      }
    }
    return frequentContributor;
  }

  modifier onlyFrequentContributor {
    require(isFrequentContributor(msg.sender), "Not a frequent contributor");
    _;
  }

  function mintNFT() external onlyFrequentContributor {
    uint userPoints = getUserPoints(msg.sender);

    if (userPoints >= TIER_3_THRESHOLD) {
      // Mint Tier 3 NFT
      nftContract.mintNFT(msg.sender, userPoints);
      emit NFTMinted(msg.sender);
    } else if (userPoints >= TIER_2_THRESHOLD) {
      // Mint Tier 2 NFT
      nftContract.mintNFT(msg.sender, userPoints);
      emit NFTMinted(msg.sender);
    } else if (userPoints >= TIER_1_THRESHOLD) {
      // Mint Tier 1 NFT
      nftContract.mintNFT(msg.sender,userPoints);
      emit NFTMinted(msg.sender);
    }
    // Add more tiers as needed
  }

  function registerNewUser(string memory _userName) external {
    require(!isRegisteredUser(msg.sender), "Already registered");
    users.push(User(0, msg.sender, _userName));
    userCount++;
    emit registeredNewUser(msg.sender);
  }

  function createNewQuestion(string memory _questionString) external {
    require(isRegisteredUser(msg.sender), "Not registered user");
    questions.push(Question(questionCount, msg.sender, false , _questionString, 0, 0, block.timestamp));
    emit createdNewQuestion(questionCount, msg.sender);
    questionCount++;
  }

  function answerQuestion(uint _questionId, string memory _answerString) external {
    require(isRegisteredUser(msg.sender), "Not registered user");
    answers.push(Answer(answerCount, _questionId, msg.sender, _answerString, 0, 0, block.timestamp));
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints += 10;
      }
    questions[_questionId].isAnswered = true;

    }
    emit answeredQuestion(_questionId, answerCount, msg.sender);
    answerCount++;
  }

  function upvoteQuestion(uint _questionId) external {
    require(_questionId < questionCount, "Invalid question ID");
    questions[_questionId].upvotes++;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints += 5;
      }
    }
    emit upvotedQuestion(_questionId, msg.sender);
  }

  function downvoteQuestion(uint _questionId) external {
    require(_questionId < questionCount, "Invalid question ID");
    questions[_questionId].downvotes++;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints -= 2;
      }
    }
    emit downvotedQuestion(_questionId, msg.sender);
  }

  function upvoteAnswer(uint _answerId) external {
    require(_answerId < answerCount, "Invalid answer ID");
    answers[_answerId].upvotes++;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints += 5;
      }
    }
    emit upvotedAnswer(_answerId, msg.sender);
  }

  function downvoteAnswer(uint _answerId) external {
    require(_answerId < answerCount, "Invalid answer ID");
    answers[_answerId].downvotes++;
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints -= 2;
      }
    }
    emit downvotedAnswer(_answerId, msg.sender);
  }

  function getUserPoints(address _user) public view returns (uint) {
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user) {
        return users[i].userPoints;
      }
    }
    return 0;
  }
  
}
