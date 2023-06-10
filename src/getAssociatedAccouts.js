import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
let array =[];
let arr = [];

let main = async () => {
    const address = "2fYKgbF2pLN71itCB6rRtuUdtfwRXvNXVUtdKua1KvAP";
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    const SPL = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      {
        filters: [
          {
            dataSize: 165, // number of bytes
          },
          {
            memcmp: {
              offset: 32, // number of bytes
              bytes: address, // base58 encoded string
            },
          },
        ],
      }
    );
    for (let i in SPL){
        arr.push(SPL[i].account.data)
        array.push({tokenAddress: arr[i].parsed.info.mint, amount: parseInt(arr[i].parsed.info.tokenAmount.amount) / 1000000000})
        }
    console.log(array)
}

main();