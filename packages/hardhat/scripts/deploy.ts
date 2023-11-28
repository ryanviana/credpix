import { ethers } from "hardhat";

async function main() {
  //Deploy
  const realTokenizadoContract = await ethers.getContractFactory("RealTokenizado");
  const realTokenizadoDeployed = await realTokenizadoContract.deploy();
  await realTokenizadoDeployed.deployed();

  const tfptContract = await ethers.getContractFactory("TFPt");
  const tfptDeployed = await tfptContract.deploy(
    "Tesouro Selic 2023",
    "TFPt",
    100000000,
    1000,
    1704067200,
    2,
    1,
    "Selic prefixado",
    realTokenizadoDeployed.address,
  );
  await tfptDeployed.deployed();

  const credpixContract = await ethers.getContractFactory("Credpix");
  const credpixDeployed = await credpixContract.deploy(realTokenizadoDeployed.address);
  await credpixDeployed.deployed();

  console.log(
    `Contrato Real Tokenizado: ${realTokenizadoDeployed.address} \n Contrato TFPt: ${tfptDeployed.address} \n Contrato Credpix: ${credpixDeployed.address}`,
  );

  //Permissionamento de contas
  await realTokenizadoDeployed.addPrivilegedAccount("0xd4A9f1f16c971f68FeF19882CBC019E616A85095");
  await realTokenizadoDeployed.addPrivilegedAccount("0x2f0571DEF7Ea8BBdb1472cB275d30071D63621d8");
  await realTokenizadoDeployed.addPrivilegedAccount(tfptDeployed.address);
  await realTokenizadoDeployed.addPrivilegedAccount(credpixDeployed.address);
  await tfptDeployed.addPrivilegedAccount("0xd4A9f1f16c971f68FeF19882CBC019E616A85095");
  await tfptDeployed.addPrivilegedAccount(credpixDeployed.address);
  await credpixDeployed.addPrivilegedAccount("0xd4A9f1f16c971f68FeF19882CBC019E616A85095");

  console.log(`Contas adicionadas ao controle de acesso!`);

  await tfptDeployed.invest("0x2f0571DEF7Ea8BBdb1472cB275d30071D63621d8", 1000000);
  const investorBalance = await tfptDeployed.balanceOf("0x2f0571DEF7Ea8BBdb1472cB275d30071D63621d8");

  console.log(`Investimento realizado e saldo do investidor é ${investorBalance} TFPt`);

  //Operacao Credipix

  await credpixDeployed.creditOperation("0x2f0571DEF7Ea8BBdb1472cB275d30071D63621d8", tfptDeployed.address, 5000);

  console.log("Operação de crédito realizada");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
