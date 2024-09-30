export interface Wallet {
    publicKey: string;  // The wallet's public key as a string
    privateKey: string; // The wallet's private key as a string
    mnemonic: string;    // The mnemonic phrase used to generate the wallet
    path: string;       // The derivation path used to generate the keys
    coinType: string;   // The type of cryptocurrency (e.g., "Solana", "Ethereum")
    accountIndex: number; // The index of the account derived from the mnemonic
  }
  