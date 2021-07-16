// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NativeTokenHolderVault is Ownable {
  using SafeMath for uint256;


  address public smars = address; // should input the smars address on the mainnet

  address[] private smarsHolders;

  address private operator;

  modifier isOperator() {
    require(operator == msg.sender, 'NativeTokenHolderVault: wrong operator');
    _;
  }
  
  constructor() public {
    operator = msg.sender;
  }

  function getSmarsHolders() public view returns (address[] memory) {
      return smarsHolders;
  }


  function getIndexInSmarsHolders(address _user) public view returns (uint) {
    uint index = 1e27;
    for (uint i = 0; i < smarsHolders.length; i++) {
      if (_user == smarsHolders[i]) {
        index = i;
      }
    }
    return index;
  }

  // should be called by owner (masterchef)
  function updateHolders(
      address _user,
      address _token,
      uint256 _holdingAmount,
      bool _isDeposited
  ) public isOperator {
    if (_token == smars) {
      if (_holdingAmount == 0) {
        if (_isDeposited) {
          smarsHolders.push(_user);
        } else {
          uint256 userIndexInHolders = getIndexInSmarsHolders(_user);
          if (userIndexInHolders != 1e27) {
            _removeUserFromSmarsHolders(userIndexInHolders);
          }
        }
      }
    }
  }


  function setSmarsAddress(address _smars) public onlyOwner {
    smars = _smars;
  }

  function setOperator(address _operator) public isOperator {
    operator = _operator;
  }

  function _removeUserFromSmarsHolders(uint _index) internal {
    for (uint i = _index; i < smarsHolders.length - 1; i++) {
      smarsHolders[i] = smarsHolders[i + 1];
    }
    smarsHolders.pop();
  }
}
