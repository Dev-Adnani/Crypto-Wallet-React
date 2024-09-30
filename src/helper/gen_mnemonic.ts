import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from "ethers";
import { Wallet } from "../model/wallet";


export const generateWalletFromMnemonic = (
  pathType: string,
  mnemonic: string,
  accountIndex: number
): Wallet | null => {
  try {
    // Convert the mnemonic to seed buffer
    const seedBuffer = mnemonicToSeedSync(mnemonic);
    
    // Define the derivation path based on the path type
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));

    let publicKeyEncoded: string;
    let privateKeyEncoded: string;
    let coinType: string;

    // Generate wallet based on the path type
    if (pathType === "501") {
      // Solana
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);

      privateKeyEncoded = bs58.encode(secretKey);
      publicKeyEncoded = keypair.publicKey.toBase58();
      coinType = "Solana"; 
    } else if (pathType === "60") {
      // Ethereum
      privateKeyEncoded = Buffer.from(derivedSeed).toString("hex");
      const wallet = new ethers.Wallet(privateKeyEncoded);
      publicKeyEncoded = wallet.address;
      coinType = "Ethereum"; 
    } else {
      // Handle unsupported path types gracefully
      return null;
    }

    // Return the generated wallet object
    return {
      publicKey: publicKeyEncoded,
      privateKey: privateKeyEncoded,
      mnemonic,
      path,
      coinType,     
      accountIndex,  
    };
  } catch (error) {
    console.error("Wallet generation error:", error);
    return null;
  }
};
