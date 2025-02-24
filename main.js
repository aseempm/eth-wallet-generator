const { Wallet } = require('ethers');
const fs = require('fs');
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generate a new wallet
const wallet = Wallet.createRandom();
const privateKey = wallet.privateKey;
const publicKey = wallet.publicKey;
const address = wallet.address;

// Ask the user for the purpose of the wallet
rl.question("What is the purpose of creating this wallet? ", (purpose) => {
  // Create a JSON object to store the wallet details
  const walletData = {
    purpose: purpose,
    privateKey: privateKey,
    publicKey: publicKey,
    address: address,
  };

  // Save the wallet data to a file
  const fileName = `wallet_${purpose}_${Date.now()}.json`;
  fs.writeFile(`wallets/${fileName}`, JSON.stringify(walletData, null, 2), (err) => {
    if (err) {
      console.error("Error saving the wallet file:", err);
    } else {
      console.log(`Wallet details saved to ${fileName}`);
    }
    // Close the readline interface
    rl.close();
  });
});
