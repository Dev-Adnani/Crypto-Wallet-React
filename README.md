
# Wallet Generator

A simple wallet generation built for React. This project allows users to generate new wallets. 
Private keys and recovery phrases can be toggled for visibility, and the generated information can be easily copied to the clipboard.

## Features

- **Generate Wallet**: Create a new wallet and view the generated private and public keys.
- **Import Wallet**: Optionally enter an existing recovery phrase to generate keys.
- **Toggle Visibility**: Show or hide private keys and recovery phrases to enhance security.
- **Copy to Clipboard**: Easily copy private keys, public keys, and the recovery phrase.

## Installation

Ensure you have [Node.js](https://nodejs.org/) and npm installed on your machine.

1. Clone the repository or add the component to your existing React project:

   ```bash
   git clone https://github.com/Dev-Adnani/Crypto-Wallet-React
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

## State Management

This project uses **Recoil** for state management:

- **mnemonicWords**: Stores the words of the recovery phrase.
- **seed**: Stores the seed derived from the mnemonic.
- **privateKeys**: Stores the generated private keys.
- **publicKeys**: Stores the generated public keys.
- **showMnemonic**: Boolean state to toggle the visibility of the recovery phrase.
- **showPrivateKeys**: Boolean state to toggle the visibility of private keys.

## How It Works

### Generating a Wallet:

- Generates a new mnemonic phrase and derives the corresponding seed.
- Uses the seed to generate private and public keys.
- Displays the generated keys and mnemonic phrase.

### Importing a Wallet:

- Optionally enter a recovery phrase to derive private and public keys.

### Visibility Toggle:

- Private keys and recovery phrases can be toggled between visible and censored (asterisks) for security.

### Clipboard Copy:

- Provides functionality to copy private keys, public keys, and the recovery phrase to the clipboard.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
