import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { walletsState } from "../atoms/walletAtom";
import { generateMnemonic } from "bip39";
import { generateWalletFromMnemonic } from "../utils/walletUtils";

const MNEMONIC_KEY = "mnemonic"; // Local storage key

// Custom Hook to manage wallets
export const useWalletManager = () => {
  const [wallets, setWallets] = useRecoilState(walletsState);
  const [mnemonic, setMnemonic] = useState<string>("");

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

  // Initialize mnemonic and first wallet
  useEffect(() => {
    const existingMnemonic = getOrCreateMnemonic();
    setMnemonic(existingMnemonic);
    addWallet();
  }, []); // Only run on initial load

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

    console.log("Wallets", wallets);
    
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
  };
};
