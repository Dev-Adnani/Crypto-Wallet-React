import Footer from "./components/ui/Footer";
import Header from "./components/ui/Header";
import { useWalletManager } from "./hooks/useWalletManager";
import { SnackbarProvider } from "notistack";
import MnemonicDisplay from "./components/blocks/mnemonic_block";

function App() {
  const { mnemonic } = useWalletManager();
  const mnemonicWords = mnemonic.split(" "); 

  return (
    <div className="min-h-screen flex flex-col bg-darkblue p-5">
      <Header />
      <SnackbarProvider />

      <div className="flex-grow p-10 bg-darkblue">
        <MnemonicDisplay mnemonicWords={mnemonicWords} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
