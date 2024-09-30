// App.tsx
import Footer from "./components/ui/Footer";
import { Mnemonic } from "./components/ui/Mnemonic";
import Header from "./components/ui/Header";
import { useWalletManager } from "./hooks/useWalletManager";

function App() {
  const { mnemonic } = useWalletManager();
  const mnemonicWords = mnemonic.split(" "); 

  return (
    <div className="min-h-screen flex flex-col bg-darkblue p-5">
      <Header />

      <div className="flex-grow p-10 bg-darkblue">
        <Mnemonic mnemonicWords={mnemonicWords} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
