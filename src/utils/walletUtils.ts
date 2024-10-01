import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { ethers } from 'ethers';
import { Wallet } from '../model/wallet';
import { enqueueSnackbar } from 'notistack';

// Function to generate a random mnemonic 
export const generateMnemonic = (): string => {
  const bip39 = require('bip39');
  return bip39.generateMnemonic();
};

// Function to generate a wallet from the mnemonic
export const generateWalletFromMnemonic = (
  pathType: string, 
  mnemonic: string, 
  accountIndex: number
): Wallet | null => {
  try {
    // Convert the mnemonic to a seed buffer
    const seedBuffer = mnemonicToSeedSync(mnemonic);

    // Define the derivation path based on the path type (Solana or Ethereum)
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString('hex'));

    let publicKeyEncoded: string;
    let privateKeyEncoded: string;
    let coinType: string;

    // Generate a Solana wallet
    if (pathType === '501') {
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keypair = Keypair.fromSecretKey(secretKey);

      privateKeyEncoded = bs58.encode(secretKey);
      publicKeyEncoded = keypair.publicKey.toBase58();
      coinType = 'Solana';
    
    // Generate an Ethereum wallet
    } else if (pathType === '60') {
      privateKeyEncoded = Buffer.from(derivedSeed).toString('hex');
      const wallet = new ethers.Wallet(privateKeyEncoded);
      publicKeyEncoded = wallet.address;
      coinType = 'Ethereum';
    
    } else {
      enqueueSnackbar('Invalid path type', { variant: 'error' });
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
    enqueueSnackbar('Error generating wallet', { variant: 'error' });
    return null;
  }
};
