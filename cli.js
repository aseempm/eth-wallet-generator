#!/usr/bin/env node

const { Wallet } = require('ethers');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

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
  const walletData = {
    purpose: purpose,
    privateKey: privateKey,
    publicKey: publicKey,
    address: address,
  };

  // Use process.cwd() to save in the calling directory
  const fileName = `wallet_${purpose}_${Date.now()}.json`;
  const dir = path.join(process.cwd(), 'wallets');

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFile(path.join(dir, fileName), JSON.stringify(walletData, null, 2), (err) => {
    if (err) {
      console.error("Error saving the wallet file:", err);
    } else {
      console.log(`Wallet details saved to wallets/${fileName}`);
    }
    rl.close();
  });
});
