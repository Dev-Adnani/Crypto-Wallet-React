import { useState } from "react";
import { useWalletManager } from "../../hooks/useWalletManager";
import { enqueueSnackbar } from "notistack";

export default function Header() {
  const { generateNewMnemonic } = useWalletManager();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateWallet = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmGenerate = () => {
    generateNewMnemonic();
    enqueueSnackbar('New Secret Code Generated Successfully', { variant: 'success' });
    setIsDialogOpen(false); 
  };

  const handleCancelGenerate = () => {
    setIsDialogOpen(false); 
  };

  return (
    <header className="bg-darkblue my-5">
      <div className=" mx-auto flex justify-between items-center">
        <div className="text-frostedwhite font-bold text-2xl">CryptoWallet</div>
        <button
          onClick={handleGenerateWallet}
          className="bg-frostedwhite text-darkblue py-2 px-4 rounded-lg hover:bg-blue-500 transition font-bold"
        >
          Generate Wallet
        </button>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg bg-frostedwhite opacity-90">
            <p className="text-lg font-semibold mb-4">Generate new wallet?</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmGenerate}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelGenerate}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
