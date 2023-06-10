import { Metaplex } from "@metaplex-foundation/js-next";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const metaplex = new Metaplex(connection);

const mint = new PublicKey("2fYKgbF2pLN71itCB6rRtuUdtfwRXvNXVUtdKua1KvAP");

const myNfts = await metaplex.nfts().findAllByOwner(mint);
console.log(myNfts)