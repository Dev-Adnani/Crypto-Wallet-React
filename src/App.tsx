// App.tsx
import Footer from "./components/ui/Footer";
import { Mnemonic } from "./components/ui/Mnemonic";
import Header from "./components/ui/Header";
import { useWalletManager } from "./hooks/useWalletManager";

function App() {
  const { mnemonic, wallets, addWallet, removeWallet } = useWalletManager();

  const mnemonicWords = mnemonic.split(" "); // Get words from the mnemonic

  return (
    <div className="min-h-screen flex flex-col bg-darkblue p-5">
      <Header />

      <div className="flex-grow p-10 bg-darkblue">
        <Mnemonic mnemonicWords={mnemonicWords} />
        <button onClick={() => addWallet()}>Add Wallet</button>
        <button onClick={() => removeWallet(0)}>Remove First Wallet</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
