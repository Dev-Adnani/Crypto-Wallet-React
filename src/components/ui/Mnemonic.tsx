import MnemonicDisplay from "../blocks/mnemonic_block";

export function Mnemonic({
  mnemonicWords,
}: {
  mnemonicWords: string[];
}) {

  return (
    <div>
      <MnemonicDisplay mnemonicWords={mnemonicWords} />
    </div>
  );
}

