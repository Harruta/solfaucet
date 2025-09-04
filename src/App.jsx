import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { RequestArdrop } from "./airdriop";

function App(){
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const rpcURl = import.meta.env.VITE_rpcURL || endpoint;

  return(
    <ConnectionProvider endpoint={rpcURl}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen flex items-center justify-center p-5 relative z-10">
            <div className="bg-gray-800/95 rounded-3xl p-10 shadow-2xl border border-white/5 backdrop-blur-sm max-w-lg w-full text-center">
              <h1 className="text-white text-3xl font-semibold mb-2 tracking-tight">Solana Airdrop</h1>
              <p className="text-gray-400 text-base mb-8 font-normal">Request SOL tokens for testing</p>
              
              <div className="flex gap-3 mb-6 justify-center items-center">
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
              
              <RequestArdrop />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;