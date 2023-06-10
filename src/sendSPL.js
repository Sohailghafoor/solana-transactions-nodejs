import {Connection, Keypair, LAMPORTS_PER_SOL, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import  {createMint, TOKEN_PROGRAM_ID, createTransferInstruction }  from "@solana/spl-token";

(async () => {
    const {log} = console;
  // Connect to cluster
  const connection = new Connection(
    clusterApiUrl("devnet"),
    "confirmed"
  );
  // Generate a new wallet keypair and airdrop SOL
  var fromWallet = Keypair.generate();
    log(fromWallet.publicKey.toBase58())
  var fromAirdropSignature = await connection.requestAirdrop(
    fromWallet.publicKey,
    LAMPORTS_PER_SOL
  );
  // Wait for airdrop confirmation
  await connection.confirmTransaction(fromAirdropSignature);

  // Generate a new wallet to receive newly minted token
  const toWallet = Keypair.generate();
  log(toWallet.publicKey.toBase58())
  // Create new token mint
  const mint = await createMint(
    connection,
    fromWallet.secretKey,
    fromWallet.publicKey,
    null,
    9,
    TOKEN_PROGRAM_ID
  );
    log(mint)
  // Get the token account of the fromWallet Solana address, if it does not exist, create it
  const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  );
    log(fromTokenAccount)
  //get the token account of the toWallet Solana address, if it does not exist, create it
  const toTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    toWallet.publicKey
  );
    log(toTokenAccount)
  // Minting 1 new token to the "fromTokenAccount" account we just returned/created
  await mint.mintTo(
    fromTokenAccount.address,
    fromWallet.publicKey,
    [],
    1000000000
  );

  // Add token transfer instructions to transaction
  const transaction = new Transaction().add(
    createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1
    )
  );

  // Sign transaction, broadcast, and confirm
  const tx = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
    log(`https://solscan.io/tx/${tx}?cluster=devnet`)
})();