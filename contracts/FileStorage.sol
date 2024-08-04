// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

//import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
//import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "hardhat/console.sol";

contract ChunkStorage /*is UUPSUpgradeable, OwnableUpgradeable*/ {
    event Chunk(bytes indexed hash, bytes data);
    event Test();
    event Name(
        address indexed sender,
        string indexed name,
        bytes32 indexed cbunk
    );
    event Deployed_zuChach0(); // Must be unique
/*
    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        emit Deployed_zuChach0();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}*/

    function mysuperfunc() public {
        emit Test();
    }

    function irevert(bool flag) public pure {
        if (flag) revert();
    }

    function getdata() public pure returns (string memory) {
        return "asdzxc";
    }

    function save(bytes calldata data) public {
        emit Chunk(data, data);
        emit Test();
    }

    function name(string calldata _name, bytes32 chunk) public {
        emit Name(msg.sender, _name, chunk);
    }
}
