import { generateMnemonic } from "bip39";
import Footer from "./components/ui/Footer"
import { Mnemonic } from "./components/ui/Mnemonic"
import { generateWalletFromMnemonic } from "./helper/gen_mnemonic";

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
   <div className="p-10 bg-darkblue h-screen">
     <Mnemonic mnemonicWords={
      mnemonicArray
    }/>
    <Footer/>  
   </div> 
  )
}

export default App

