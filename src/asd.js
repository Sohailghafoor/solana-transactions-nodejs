import { Keypair } from "@solana/web3.js";
import * as bs58 from "bs58";

const pk = bs58.decode("2mnFueh8iBZHtdhe4f7RJRCh19qeYQLNjXi1VtHyWcWAT6HYXDGzmTfJd8gd24tj1heLhNTrSDn2bue55i7bvKAA")
  const keypair = Keypair.fromSecretKey(pk);
  console.log(keypair.publicKey.toBase58());