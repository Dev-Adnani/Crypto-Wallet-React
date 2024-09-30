export default function Header() {
    return (
      <header className="bg-darkblue my-5">
        <div className=" mx-auto flex justify-between items-center">
       
            <div className="text-frostedwhite font-bold text-2xl">
                CryptoWallet
            </div>
            <button
                className="bg-frostedwhite text-darkblue py-2 px-4 rounded-lg hover:bg-blue-500 transition font-bold">
                Generate Wallet
            </button>
        </div>
      </header>
    )
  }
  