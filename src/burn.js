import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair
  } from "@solana/web3.js";
  import {
    burnChecked,
    TOKEN_PROGRAM_ID,
  } from "@solana/spl-token";
  import * as bs58 from "bs58";
  
  (async () => {
    // connection
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
    // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
    const feePayer = Keypair.fromSecretKey(
      bs58.decode(
        "588FU4PktJWfGfxtzpAAXywSNt74AvtroVzGfKkVN1LwRuvHwKGr851uH8czM5qm4iqLbs1kKoMKtMJG4ATR7Ld2"
      )
    );
  
    // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
    const alice = Keypair.fromSecretKey(
      bs58.decode(
        "4NMwxzmYj2uvHuq8xoqhY8RXg63KSVJM1DXkpbmkUY7YQWuoyQgFnnzn6yo3CMnqZasnNPNuAT2TLwQsCaKkUddp"
      )
    );
  
    const mintPubkey = new PublicKey(
      "8mAKLjGGmjKTnmcXeyr3pr7iX13xXVjJJiL6RujDbSPV"
    );
  
    const tokenAccountPubkey = new PublicKey(
      "2XYiFjmU1pCXmC2QfEAghk6S7UADseupkNQdnRBXszD5"
    );
  
      let txhash = await burnChecked(
        connection, // connection
        feePayer, // payer
        tokenAccountPubkey, // token account
        mintPubkey, // mint
        alice, // owner
        1e8, // amount, if your deciamls is 8, 10^8 for 1 token
        8
      );
      console.log(`txhash: ${txhash}`);

  })();
  