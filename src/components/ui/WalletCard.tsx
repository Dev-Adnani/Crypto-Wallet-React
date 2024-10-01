import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Trash2, Eye, EyeOff, Copy } from "lucide-react"; // Import Eye and EyeOff icons
import { Wallet } from "../../model/wallet";
import { enqueueSnackbar } from "notistack";

interface WalletCardProps {
  wallet: { solanaWallet: Wallet; ethereumWallet: Wallet };
  isActive: boolean;
  toggleCard: () => void;
  removeWallet: () => void;
  index: number;
}



const WalletCard: React.FC<WalletCardProps> = ({ wallet, isActive, toggleCard, removeWallet, index }) => {
  const [showSolanaPrivateKey, setShowSolanaPrivateKey] = useState(false);
  const [showEthereumPrivateKey, setShowEthereumPrivateKey] = useState(false);

    // Write a copy function that copies the public key to the clipboard
  const copyToClipboard = (publicKey: string,privateKey : string,name : string) => {
    navigator.clipboard.writeText("Public Key: " + publicKey + " Private Key: " + privateKey);
    enqueueSnackbar(name + 'Account - '+ index+1 +' Public and Private Key Copied to Clipboard', { variant: 'success' });
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg p-6 w-full bg-gray-800 border-2 border-white shadow-[0_0_10px_5px_rgba(255,255,255,0.5)] mb-6"
    >
      {/* Wallet Heading */}
      <div className="flex w-full justify-between items-center" onClick={toggleCard}>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-frostedwhite">
          Wallet {index + 1}
        </h2>
       <div className="flex flex-row">
          {isActive ? <ChevronUp className="size-4 text-frostedwhite mr-5" /> : <ChevronDown className="size-4 text-frostedwhite mr-5" />}
          <Trash2 onClick={
            () => {
              removeWallet();
              enqueueSnackbar('Wallet Removed Successfully', { variant: 'success' });
            }
          } className="ml-2 size-4 text-frostedwhite" />
       </div>
      </div>

      {/* Wallet Details */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex flex-row items-start mt-4"
        >
          {/* Solana Wallet */}
          <div className="w-full mb-4">
          <div className="w-full flex flex-row">
           <h3 className="text-lg text-[#ff4d4d] pr-5">Solana Wallet</h3>
            <button onClick={() => setShowSolanaPrivateKey(!showSolanaPrivateKey)}>
                {showSolanaPrivateKey ? <EyeOff className="text-frostedwhite size-5" /> : <Eye className="text-frostedwhite size-5" />}
              </button>
              <button 
              className="ml-2"
              onClick={() => copyToClipboard(wallet.solanaWallet.publicKey,wallet.solanaWallet.privateKey,wallet.solanaWallet.coinType)}>
               <Copy className="text-frostedwhite size-5"
               />
              </button>
            </div>
            <p className="text-sm text-frostedwhite">Public Key: {wallet.solanaWallet.publicKey}</p>
            <div className="flex items-center">
              <p className="text-sm text-frostedwhite mr-2">
                Private Key: {showSolanaPrivateKey ? wallet.solanaWallet.privateKey : "••••••••••••••••"}
              </p>   
            </div>
          </div>

          {/* Ethereum Wallet */}
          <div className="w-full">
           <div className="w-full flex flex-row">
           <h3 className="text-lg text-[#46b7fe] pr-5">Ethereum Wallet</h3>
            <button onClick={() => setShowEthereumPrivateKey(!showEthereumPrivateKey)}>
                {showEthereumPrivateKey ? <EyeOff className="text-frostedwhite size-5" /> : <Eye className="text-frostedwhite size-5" />}
              </button>
              <button 
              className="ml-2"
              onClick={() => copyToClipboard(wallet.ethereumWallet.publicKey,wallet.ethereumWallet.privateKey,wallet.ethereumWallet.coinType)}>
               <Copy className="text-frostedwhite size-5" />
              </button>
            </div>
            <p className="text-sm text-frostedwhite">Public Key: {wallet.ethereumWallet.publicKey}</p>
            <div className="flex items-center">
              <p className="text-sm text-frostedwhite mr-2">
                Private Key: {showEthereumPrivateKey ? wallet.ethereumWallet.privateKey : "••••••••••••••••"}
              </p>
             
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};



export default WalletCard;
