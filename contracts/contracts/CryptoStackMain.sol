// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./CryptoStackRewardNFT.sol"; // Import the NFT contract

contract CryptoStackMain {

  CryptoStackRewardNFT public nftContract; // Instance of the NFT contract

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
  }

  struct Answer {
    uint id;
    uint questionId;
    bool isAccepted;
    address payable replierAddress;
    string answerString;
  }
  
  User[] public users;
  Question[] public questions;
  Answer[] public answers;

  event registeredNewUser(address);
  event createdNewQuestion(uint, address);
  event answeredQuestion(uint, uint, address);
  event acceptedAnswer(uint, uint);
  event NFTMinted(address indexed owner); // Event for NFT minting

  // NFT tiers based on user points
  uint constant TIER_1_THRESHOLD = 100;
  uint constant TIER_2_THRESHOLD = 200;
  uint constant TIER_3_THRESHOLD = 300;

  constructor(address _nftContractAddress) {
    nftContract = CryptoStackRewardNFT(_nftContractAddress);
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
    questions.push(Question(questionCount, msg.sender, false , _questionString));
    emit createdNewQuestion(questionCount, msg.sender);
    questionCount++;
  }

  function answerQuestion(uint _questionId, string memory _answerString) external {
    require(isRegisteredUser(msg.sender), "Not registered user");
    answers.push(Answer(answerCount, _questionId, false, payable(msg.sender), _answerString));
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == msg.sender) {
        users[i].userPoints += 10;
      }
    }
    emit answeredQuestion(_questionId, answerCount, msg.sender);
    answerCount++;
  }

  function getUserPoints(address _user) public view returns (uint) {
    for (uint i = 0; i < userCount; ++i) {
      if (users[i].userAddress == _user) {
        return users[i].userPoints;
      }
    }
    return 0;
  }
  
  function acceptAnswer(uint _answerId) external {
    Answer memory answer = answers[_answerId];
    require(questions[answer.questionId].questionaireAddress == msg.sender, "Not original user");
    questions[answer.questionId].isAnswered = true;
    answers[_answerId].isAccepted = true;
    payable(answers[_answerId].replierAddress).transfer(0.01 ether);
    emit acceptedAnswer(_answerId, answer.questionId);
  }

}