import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { enqueueSnackbar } from "notistack";

interface MnemonicDisplayProps {
  mnemonicWords: string[];
}

const MnemonicDisplay = ({ mnemonicWords }: MnemonicDisplayProps) => {
  const [showMnemonic, setShowMnemonic] = useState(false);

  // Copy to clipboard function
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="group flex flex-col items-center gap-4 cursor-pointer rounded-lg p-8 w-full bg-slate-200  border-2 border-white bg-gray-800 shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]" 
    >
      <div className="flex w-full justify-between items-center"       onClick={() => setShowMnemonic(!showMnemonic)}
      >
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-frostedwhite">
          Your Secret Phrase
        </h2>
        <button onClick={() => setShowMnemonic(!showMnemonic)} >
          {showMnemonic ? <ChevronUp className="size-4  text-frostedwhite" /> : <ChevronDown className="size-4 text-frostedwhite" />}
        </button>
      </div>

      {showMnemonic && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="flex flex-col w-full items justify-center mt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center w-full items-center "
          >
            {mnemonicWords.map((word, index) => (
              <p
                key={index}
                className="md:text-lg bg-white-200 hover:bg-gray-300 transition-all duration-300 rounded-lg p-4 text-center text-frostedwhite border border-frostedwhite"
              >
                {word}
              </p>
            ))}
          </motion.div>
          <button
            className="mt-4 text-white px-4 py-2 rounded-lg flex items-center justify-center bg-darkblue  border border-frostedwhite"
            onClick={() => {
              copyToClipboard(mnemonicWords.join(" "));
              enqueueSnackbar('Copied to clipboard', { variant: 'success' });  
            }}
          >
            <Copy className="size-4 mr-2 align-middle text-frostedwhite" />
            <span className="text-center text-frostedwhite">Copy Secret Phrase</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MnemonicDisplay;
