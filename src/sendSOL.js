import {
    Connection,
    Keypair,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import * as bs58 from "bs58";

  
  (async () => {
      const { log } = console;
    const fromKeypair = Keypair.generate();
    const toKeypair = Keypair.fromSecretKey(
      bs58.decode(
        "2mnFueh8iBZHtdhe4f7RJRCh19qeYQLNjXi1VtHyWcWAT6HYXDGzmTfJd8gd24tj1heLhNTrSDn2bue55i7bvKAA"
      ));
    log(fromKeypair.publicKey.toBase58(), toKeypair.publicKey.toBase58());
    return
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed"
    );
  
    const airdropSignature = await connection.requestAirdrop(
      fromKeypair.publicKey,
      LAMPORTS_PER_SOL
    );
  
    await connection.confirmTransaction(airdropSignature);
  
    const lamportsToSend = 900_000_000;
  
    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: lamportsToSend,
      })
    );
  
    const tx = await sendAndConfirmTransaction(connection, transferTransaction, [
      fromKeypair,
    ]);
    log(`https://solscan.io/tx/${tx}?cluster=devnet`)
  })();