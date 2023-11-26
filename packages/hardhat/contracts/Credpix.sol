//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ITPFt {
    function balanceOf(address) external returns (uint);

    function name() external returns (string memory);

    function symbol() external returns (string memory);

    function decimals() external returns (uint);

    function totalSupply() external returns (uint);
    
    function privilegedTransfer(address, address, uint) external returns (bool);

    function getTokenPrice() external returns (uint256);
}

interface IBRLt {
    function balanceOf(address) external returns (uint);

    function name() external returns (string memory);

    function symbol() external returns (string memory);

    function decimals() external returns (uint);

    function totalSupply() external returns (uint);
    
    function privilegedTransfer(address, address, uint) external returns (bool);
}

contract Credpix is Ownable{

    address public BRLtAddress;
    mapping(address => bool) public privilegedAccounts; //Servicos gov e bancos;

    constructor(address _BRLtAddress) Ownable(msg.sender) {
        BRLtAddress = _BRLtAddress;
    }

    modifier onlyPrivileged() {
        require(privilegedAccounts[msg.sender], "Acesso negado: conta nao privilegiada");
        _;
    }

    function addPrivilegedAccount(address account) public onlyOwner {
        privilegedAccounts[account] = true;
    }

    function removePrivilegedAccount(address account) public onlyOwner {
        privilegedAccounts[account] = false;
    }

    function creditOperation(address investor, address TPFtAddress, uint256 value) public returns (uint256){

        uint256 tokensAmount = (value * 10 ** 18)/(ITPFt(TPFtAddress).getTokenPrice());
        ITPFt(TPFtAddress).privilegedTransfer(investor, address(this), tokensAmount);
        IBRLt(BRLtAddress).privilegedTransfer(msg.sender, investor, value);

        return tokensAmount;
    }
}