import React, { useState } from "react";
import WalletCard from "./WalletCard";
import { motion } from "framer-motion";
import { useWalletManager } from "../../hooks/useWalletManager";



const WalletDisplay: React.FC = () => {
  const { wallets, removeWallet } = useWalletManager();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle which card is open
  const toggleCard = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-10 "
    >
      {wallets.map((wallet, index) => (
        <WalletCard
          key={index}
          wallet={wallet}
          isActive={activeIndex === index}
          toggleCard={() => toggleCard(index)}
          removeWallet={() => removeWallet(index)}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default WalletDisplay;
