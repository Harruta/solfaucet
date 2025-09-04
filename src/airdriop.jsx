import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

export function RequestArdrop(){
    const wallet = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("1");
    const [isLoading, setIsLoading] = useState(false);

    async function requestAirdrop(){
        if (!wallet.publicKey) {
            alert("Please connect your wallet first");
            return;
        }

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIsLoading(true);
        try {
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                parseFloat(amount) * LAMPORTS_PER_SOL
            );
            
            // Wait for confirmation
            await connection.confirmTransaction(signature);
            alert("Airdrop successful!");
        } catch (error) {
            console.error("Airdrop failed:", error);
            alert("Airdrop failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div>
            <input 
                id="amount" 
                type="number" 
                placeholder="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-700/80 border border-white/10 rounded-xl px-4 py-4 text-white text-base w-full mb-6 text-center transition-all duration-200 focus:outline-none focus:border-violet-600 focus:ring-3 focus:ring-violet-600/10 placeholder:text-gray-500"
                min="0.1"
                max="2"
                step="0.1"
            />
            <button 
                onClick={requestAirdrop} 
                className="bg-violet-500 border-none rounded-xl px-8 py-4 text-white text-base font-semibold cursor-pointer transition-all duration-200 w-full tracking-wide hover:bg-violet-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30 active:translate-y-0 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                disabled={isLoading || !wallet.connected}
            >
                {isLoading ? "Requesting..." : "Request Airdrop"}
            </button>
        </div>
    )
}