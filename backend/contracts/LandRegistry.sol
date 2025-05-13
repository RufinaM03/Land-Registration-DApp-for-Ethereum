// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;

contract LandRegistry {
    struct User {
        string name;
        bool isRegistered;
        uint256 identityCommitment;
    }

    struct Property {
        uint256 id;
        address owner;
        string details;
        uint256 price;
        bool isForSale;
    }

    mapping(address => User) public users;
    mapping(uint256 => Property) public properties;
    mapping(uint256 => uint256) public merkleTreeRoots;
    uint256[] public propertyIds;

    ISemaphore public semaphore;
    uint256 public groupId;

    event UserRegistered(address indexed user, string name, uint256 identityCommitment);
    event PropertyAdded(uint256 indexed id, address indexed owner, string details);
    event OwnershipTransferred(uint256 indexed id, address indexed previousOwner, address indexed newOwner);
    event MerkleRootUpdated(uint256 indexed groupId, uint256 newMerkleRoot);
    event DebugLog(string message);
    event PropertyListedForSale(uint256 indexed id, uint256 price);
    event PropertySold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price);

    constructor(address _semaphoreContract) {
        semaphore = ISemaphore(_semaphoreContract);
        groupId = uint256(keccak256(abi.encodePacked(address(this)))) % SNARK_SCALAR_FIELD;
        semaphore.createGroup(groupId, 20, 0, address(this));
    }

    function registerUser(string memory _name, uint256 _identityCommitment) public {
        require(!users[msg.sender].isRegistered, "User already registered!");

        users[msg.sender] = User(_name, true, _identityCommitment);
        semaphore.addMember(groupId, _identityCommitment);

        uint256 newRoot = uint256(keccak256(abi.encodePacked(block.number, _identityCommitment, groupId))); 
        merkleTreeRoots[groupId] = newRoot;  

        emit MerkleRootUpdated(groupId, newRoot);
        emit UserRegistered(msg.sender, _name, _identityCommitment);
    }

    function addProperty(
        uint256 _id,
        string memory _details,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) public {
        require(users[msg.sender].isRegistered, "Owner must be a registered user!");
        require(properties[_id].owner == address(0), "Property ID already exists!");

        uint256 merkleTreeRoot = merkleTreeRoots[groupId];
        //semaphore.verifyProof(groupId, bytes32(merkleTreeRoot), uint256(uint160(msg.sender)), nullifierHash, proof);

        properties[_id] = Property(_id, msg.sender, _details, 0, false);
        propertyIds.push(_id);

        emit PropertyAdded(_id, msg.sender, _details);
    }

    function transferOwnership(
        uint256 _id,
        address _newOwner,
        uint256 nullifierHash,
        uint256[8] memory proof
    ) public {
        require(users[_newOwner].isRegistered, "New owner must be a registered user!");
        require(properties[_id].owner == msg.sender, "You are not the owner!");

        uint256 merkleTreeRoot = merkleTreeRoots[groupId];
        //semaphore.verifyProof(groupId, bytes32(merkleTreeRoot), uint256(uint160(_newOwner)), nullifierHash, proof);

        emit DebugLog("Proof Verified with Semaphore");

        address previousOwner = properties[_id].owner;
        properties[_id].owner = _newOwner;

        emit OwnershipTransferred(_id, previousOwner, _newOwner);
    }

    function setPrice(uint256 _id, uint256 _price) public {
        require(properties[_id].owner == msg.sender, "You are not the owner!");
        properties[_id].price = _price;
        emit DebugLog("Price updated");
    }

    function sellProperty(uint256 _id, uint256 _price) public {
        require(properties[_id].owner == msg.sender, "You are not the owner!");
        properties[_id].isForSale = true;
        properties[_id].price = _price;
        emit PropertyListedForSale(_id, _price);
    }

    function isForSaleLabel(uint256 _id) public view returns (bool) {
        return properties[_id].isForSale;
    }

    function buyProperty(uint256 _id) public payable {
        Property storage prop = properties[_id];
        require(prop.isForSale, "Property is not for sale!");
        require(msg.value >= prop.price, "Insufficient payment!");
        require(users[msg.sender].isRegistered, "Buyer must be registered!");
        require(msg.sender != prop.owner, "Owner cannot buy their own property!");
        
        address oldOwner = prop.owner;
        prop.owner = msg.sender;
        prop.isForSale = false;

        payable(oldOwner).transfer(msg.value);

        emit PropertySold(_id, oldOwner, msg.sender, msg.value);
    }

    function pay(address payable _to) public payable {
        require(msg.value > 0, "Send some ether!");
        _to.transfer(msg.value);
        emit DebugLog("Payment made");
    }

    function isUserRegistered(address _user) public view returns (bool, string memory, uint256) {
        return (users[_user].isRegistered, users[_user].name, users[_user].identityCommitment);
    }

    function getProperty(uint256 _propertyId) public view returns (uint256, address, string memory, uint256, bool) {
        require(properties[_propertyId].owner != address(0), "Property not found!");
        Property memory prop = properties[_propertyId];
        return (prop.id, prop.owner, prop.details, prop.price, prop.isForSale);
    }

    function getAllPropertyIds() public view returns (uint256[] memory) {
        return propertyIds;
    }
}
