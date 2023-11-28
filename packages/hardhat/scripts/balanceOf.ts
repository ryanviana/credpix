import { ethers } from "hardhat";
import YOUR_CONTRACT_ABI from "../artifacts/contracts/TFPt.sol/TFPt.json";

async function main() {
  // Substitua YOUR_CONTRACT_ABI pelo JSON da ABI do contrato
  const contractABI = YOUR_CONTRACT_ABI.abi;

  // Substitua YOUR_CONTRACT_ADDRESS pelo endereço do contrato
  const tfptContractAddress = "0xaCC72ae0A791D5820DF0F3A74F229B0743553007";

  // Conectar ao contrato usando um provedor
  const provider = ethers.provider;
  const contract = new ethers.Contract(tfptContractAddress, contractABI, provider);

  // Substitua com o endereço do investidor
  const investorAddress = "0x2f0571DEF7Ea8BBdb1472cB275d30071D63621d8";

  // Chamar a função balanceOf
  const balance = await contract.balanceOf(investorAddress);

  // Exibir o saldo
  console.log(`O saldo do investidor é: ${balance.toString()}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
