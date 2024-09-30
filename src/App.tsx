import { generateMnemonic } from "bip39";
import Footer from "./components/ui/Footer"
import { Mnemonic } from "./components/ui/Mnemonic"
import { generateWalletFromMnemonic } from "./helper/gen_mnemonic";
import Header from "./components/ui/Header";

function App() {
  let mnemonic = generateMnemonic(); 
  let mnemonicArray = mnemonic.split(" "); 
  const wallets: Array<{ solanaWallet: any; ethereumWallet: any;  }> = [];

  const addWallet = () => {
    const newIndex = wallets.length; 
    const solanaWallet  = generateWalletFromMnemonic("501",mnemonic, newIndex);
    const ethereumWallet = generateWalletFromMnemonic("60",mnemonic, newIndex);

    wallets.push({ solanaWallet, ethereumWallet });

    console.log(`Wallet ${newIndex} added!`);
    console.log("Wallets", wallets);
  };

  return (
    <div className="min-h-screen flex flex-col bg-darkblue p-5">
      {/* Header always at the top */}
      <Header />
      
      {/* Content in the middle */}
      <div className="flex-grow p-10 bg-darkblue">
        <Mnemonic mnemonicWords={mnemonicArray} />
      </div>
      
      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}

export default App;
