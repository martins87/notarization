import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("sepolia");
const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);
const walletAddress = wallet.address;

export const register = async (data) => {
  let nonce;

  provider.getTransactionCount(walletAddress).then((txCount) => {
    nonce = txCount;
  });

  let txObject = {
    from: walletAddress,
    to: walletAddress,
    value: ethers.parseEther("0"),
    gasLimit: 30000,
    // gasPrice: 500000000000, // 500 Gwei
    // gasPrice: 7321080000000000, // 500 Gwei
    data: "0x" + Buffer.from(data, "utf8").toString("hex"),
    chainId: 11155111,
    nonce: nonce,
  };

  let signedTx = await wallet.signTransaction(txObject);
  const tx = await wallet.sendTransaction(txObject);

  return tx.hash;
};
