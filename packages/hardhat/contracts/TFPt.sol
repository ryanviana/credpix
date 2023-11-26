//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./math.sol";

interface IBRLt {
    function balanceOf(address) external returns (uint);

    function name() external returns (string memory);

    function symbol() external returns (string memory);

    function decimals() external returns (uint);

    function totalSupply() external returns (uint);
    
    function privilegedTransfer(address, address, uint) external returns (bool);
}

contract TFPt is ERC20Burnable, Ownable, DSMath {

  mapping(address => bool) public privilegedAccounts; //Contas privilegiadas (servicos e talvez bancos)

  uint256 public immutable deployTimestamp;
  address public paymentToken; //Real Tokenizado

  uint256 public immutable maxAmount;
  uint64 public immutable interestRate;
  uint256 public immutable dueDate;
  bytes32 public immutable assetType;
  uint256 public minimumInvestment;

  uint8 public DECIMALS;

  address[] public tokenOwners;
  mapping(address => uint256) public ownershipTimestamp;


	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _maxAmount,
    uint16 _interestRate,
    uint256 _dueDate,
    uint8 _decimals,
    uint256 _minimumInvestment,
    string memory _assetType,
    address _paymentToken
  ) ERC20(_name, _symbol) Ownable(msg.sender) {
    require(bytes(_assetType).length <= 32, "Asset type must be 32 bytes or less");

    maxAmount = _maxAmount;
    interestRate = _interestRate;
    dueDate = _dueDate;
    DECIMALS = _decimals;
    minimumInvestment = _minimumInvestment;
    assetType = keccak256(bytes(_assetType));
    deployTimestamp = block.timestamp;
	  paymentToken = _paymentToken;

    privilegedAccounts[msg.sender] = true;
  }

  modifier onlyPrivileged() {
    require(privilegedAccounts[msg.sender], "Acesso negado: conta nao privilegiada");
    _;
  }

  // Função para adicionar um endereço à lista de contas privilegiadas
  function addPrivilegedAccount(address account) public onlyOwner {
      privilegedAccounts[account] = true;
  }

  // Função para remover um endereço da lista de contas privilegiadas
  function removePrivilegedAccount(address account) public onlyOwner {
      privilegedAccounts[account] = false;
  }

  // Função para transferir tokens de qualquer conta sem necessidade de aprovação
  function privilegedTransfer(address from, address to, uint256 amount) public onlyPrivileged {
      _transfer(from, to, amount);
  }

  /**
   * @dev Transfers the specified amount of series tokens to the specified recipient.
   * @notice This function can only be called by the owner of the Debenture Token Contract.
   *
   * @param recipient The address of the recipient to transfer the series tokens to.
   * @param amount The amount of series tokens to transfer.
   * @return A boolean indicating whether the transfer was successful or not.
   */
  function transfer(address recipient, uint256 amount) public onlyOwner override returns (bool) {
    return super.transfer(recipient, amount);
  }

  /**
   * @dev Transfers the specified amount of series tokens from the sender's balance to the specified recipient.
   * @notice This function can only be called by the owner of the Debenture Token Contract.
   *
   * @param sender The address of the sender to transfer the series tokens from.
   * @param recipient The address of the recipient to transfer the series tokens to.
   * @param amount The amount of series tokens to transfer.
   * @return A boolean indicating whether the transfer was successful or not.
   */
  function transferFrom(address sender, address recipient, uint256 amount) public onlyOwner override returns (bool) {
    return super.transferFrom(sender, recipient, amount);
  }

      /**
     * @dev Returns the current token price for the series based on the current interest rate and the elapsed time since the series was deployed.
     * @notice The function calculates the number of compounding periods that have elapsed based on the current time and the due date of the series.
     * @notice It then calculates the current token price by multiplying the starting token price by (1 + interestRate) to the power of the number of compounding periods.
     * @notice If there is any remaining time that does not fall into a full compounding period, the function calculates the remaining interest for that time and adjusts the token price accordingly.
     * @return The current token price for the series.
     */
    function getTokenPrice() public view returns (uint256) {
        uint256 ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
        uint256 price = WAD; // 1 * 10 ** 18

        uint256 interestRateWad = interestRate * 10 ** 14; // Convert to wad format (150 = 1.5% = 0.015)

        uint256 elapsedTime;
        if (block.timestamp > dueDate) {
            elapsedTime = dueDate - deployTimestamp;
        } else {
            //elapsedTime = block.timestamp + 31536000 - deployTimestamp;
            elapsedTime = 31536000;
        }

        uint256 compoundingPeriods = elapsedTime / ONE_YEAR_IN_SECONDS;
        uint256 remainingTime = elapsedTime % ONE_YEAR_IN_SECONDS;

        for (uint256 i = 0; i < compoundingPeriods; i++) {
            price = wmul(price, add(WAD, interestRateWad));
        }

        if (remainingTime > 0) {
            uint256 remainingInterest = mul(interestRateWad, remainingTime) / ONE_YEAR_IN_SECONDS;
            uint256 remainingRate = add(WAD, remainingInterest);
            price = wmul(price, remainingRate);
        }

        return price;
    }

  /**
   * @dev Returns the current balance of the calling address in terms of the underlying interest token.
   * @notice The function first gets the current token price by calling the getTokenPrice() function.
   * @notice It then multiplies the balance of the calling wallet by the token price to get the current balance in terms of the interest token.
   * @return The current balance of the calling address in terms of the underlying interest token.
   */
  function getCurrentBalance() public view virtual returns (uint256) {
    uint256 tokenPrice = this.getTokenPrice();
    return this.balanceOf(msg.sender) * tokenPrice;
  }

  /**
   * @dev Sets the ownership timestamp of a specific investor to the current block timestamp.
   * @notice The function can only be called by the owner of the contract.
   * @param _investor The address of the investor whose ownership timestamp is being set.
   */
  function setOwnershipTimestamp(address _investor) public onlyOwner {
    ownershipTimestamp[_investor] = block.timestamp;
  }

  function decimals() public override view virtual returns (uint8) {
    return DECIMALS;
  }

  /**
   * @dev Adds the specified investor to the list of token owners.
   * @notice This function can only be called by the owner of the Debenture Token Contract.
   * @param _investor The address of the investor to add to the list of token owners.
   */
  function addToTokenOwners(address _investor) public onlyOwner {
    tokenOwners.push(_investor);
  }

  /**
   * @dev Adds the specified investor to the list of token owners.
   * @notice This function can only be called by the owner of the Debenture Token Contract.
   * @param _investor The address of the investor to add to the list of token owners.
   */
  function removeFromTokenOwners(address _investor) public onlyOwner {
    uint256 indexToRemove = tokenOwners.length;
    for (uint256 i = 0; i < tokenOwners.length; i++) {
        if (tokenOwners[i] == _investor) {
            indexToRemove = i;
            break;
        }
    }
    if (indexToRemove < tokenOwners.length) {
        delete tokenOwners[indexToRemove];
    }  
  }

  /**
   * @dev Returns the address from an specific array index.
   * @return Investor address stored in the index.
   */
  function getTokenOwners (uint32 index) public view returns (address) {
    return tokenOwners[index];
  }

  /**
   * @dev Returns the total number of token owners.
   * @return An unsigned integer representing the total number of token owners.
   */
  function tokenOwnersLength() external view virtual returns (uint256) {
    return tokenOwners.length;
  }

  function setMinimumInvestment (uint256 _minimumInvestment) public onlyOwner {
    minimumInvestment = _minimumInvestment;
  }

    /**
     * @dev Allows an investor to invest in a specific series by providing the series index and the investment value.
     * @notice If the series index is not valid, the function reverts with an InvalidSeriesIndex error.
     * @notice If the investment value is less than the minimum investment amount required for the series, the function reverts with an InvestmentValueBelowMinimumAmount error.
     * @notice If the series asset type is "coupon", the function checks whether the investor has already claimed interest within the last 30 days.
     * @notice If so, the function reverts with a MustClaimInterestToInvestAgain error.
     * @notice The function transfers the investment value in interest tokens from the investor to the contract address.
     * @notice It then calculates the amount of series tokens that the investor should receive based on the investment value and the current token price.
     * @notice If the investor does not already own any series tokens, the function sets the ownership timestamp for the investor.
     * @notice Finally, the function emits a NewInvestment event and returns true if the investment was successful.
     * @param investmentValue The value of the investment in interest tokens.
     * @return A boolean value indicating whether the investment was successful.
     */

	function invest(address investor, uint256 investmentValue) public returns (bool) {
        
        require(investmentValue > minimumInvestment, "Invista o valor minimo");
        
        require(IBRLt(paymentToken).privilegedTransfer(investor, address(this), investmentValue), "Interest Token transaction failed.");
        
        uint256 tokenPrice = getTokenPrice();
        uint256 assetAmount = (investmentValue * WAD) / tokenPrice;
        uint256 assetRest = (investmentValue * WAD) % tokenPrice;
        uint256 totalAssetAmount = (((assetAmount * WAD) + (assetRest * WAD) / tokenPrice) / (WAD / 10 ** DECIMALS))/100;

        _mint(investor, totalAssetAmount);

        if (ownershipTimestamp[investor] == 0) {
            setOwnershipTimestamp(investor);
        }

        addToTokenOwners(investor);

        return true;
    }
}
