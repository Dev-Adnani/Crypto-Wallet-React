import { atom } from 'recoil';
import { Wallet } from '../model/wallet';

// Define the atom type
export const walletsState = atom<Array<{ solanaWallet: Wallet; ethereumWallet: Wallet }>>({
  key: 'walletsState', // unique ID for the atom
  default: [], // default value (empty array)
});


export const mnemonicState = atom({
  key: 'mnemonicState',
  default: '', // Initial state for the mnemonic
});

