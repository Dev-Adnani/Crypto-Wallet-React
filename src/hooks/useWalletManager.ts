import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { walletsState, mnemonicState } from "../atoms/walletAtom"; // Import the mnemonic state atom
import { generateMnemonic } from "bip39";
import { generateWalletFromMnemonic } from "../utils/walletUtils";

const MNEMONIC_KEY = "mnemonic"; 

export const useWalletManager = () => {
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [mnemonic, setMnemonic] = useRecoilState(mnemonicState); 

  // Function to check local storage for mnemonic or generate new
  const getOrCreateMnemonic = (): string => {
    const storedMnemonic = localStorage.getItem(MNEMONIC_KEY);
    if (storedMnemonic) {
      return storedMnemonic;
    } else {
      const newMnemonic = generateMnemonic();
      localStorage.setItem(MNEMONIC_KEY, newMnemonic); 
      return newMnemonic;
    }
  };

  // Function to generate a new mnemonic and replace the existing one in local storage
  const generateNewMnemonic = () => {
    const newMnemonic = generateMnemonic();
    localStorage.setItem(MNEMONIC_KEY, newMnemonic);
    setMnemonic(newMnemonic); 
    addWallet();
  };

  // Initialize mnemonic and first wallet
  useEffect(() => {
    const existingMnemonic = getOrCreateMnemonic();
    setMnemonic(existingMnemonic);
    if (wallets.length === 0) {
      addWallet();
    }
  }, []); 

  // Function to get all wallets
  const getAllWallets = () => {
    return wallets;
  };

  // Function to add a new wallet
  const addWallet = () => {
    const walletMnemonic = getOrCreateMnemonic();
    const newIndex = wallets.length;
    const solanaWallet = generateWalletFromMnemonic('501', walletMnemonic, newIndex);
    const ethereumWallet = generateWalletFromMnemonic('60', walletMnemonic, newIndex);

    if (solanaWallet && ethereumWallet) {
      setWallets((prevWallets) => [...prevWallets, { solanaWallet, ethereumWallet }]);
    }
  };

  // Function to remove a wallet by index
  const removeWallet = (index: number) => {
    setWallets((prevWallets) => prevWallets.filter((_, i) => i !== index));
  };

  return {
    mnemonic,
    wallets,
    addWallet,
    removeWallet,
    getAllWallets,
    generateNewMnemonic,
  };
};
