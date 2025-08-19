import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css"
import { RequestAirdrop } from "./airdrop";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const rpcURL = import.meta.env.VITE_RPC_URL || endpoint;
  return (
    <ConnectionProvider endpoint={rpcURL}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
            <WalletMultiButton />
            <WalletDisconnectButton />
            <RequestAirdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
