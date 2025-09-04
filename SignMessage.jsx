import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
export function SignMessage(){
    const { publicKey, signMessage } = useWallet();

    const onClick = async() => {
        if(!publicKey){
            alert("Wallet not connected");
            return;
        }
        if(!signMessage){
            alert("Wallet does not support siginning message");
            return;
        }
        const message = document.getElementById("message").value;
        const encodeMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodeMessage);

        if(!ed25519.verify(signature,encodeMessage, publicKey.toBytes())){
            alert("Message signature invalid");
            return;
        }
        alert(`message signature: ${bs58.encode(signature)}`);
    };
    return(
        <div>
            <input id="maessage" type="text" placeholder="Message"/>
            <buton onClick={onClick}>Sign Message</buton>
        </div>
    );
}
