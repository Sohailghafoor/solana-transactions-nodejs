
import {Connection, Keypair, clusterApiUrl, PublicKey} from '@solana/web3.js';
import { createMint, TOKEN_PROGRAM_ID, getOrCreateAssociatedAccountInfo } from '@solana/spl-token';

(async () => {
    const {log} = console;
    //create connection to devnet
    const connection = new Connection(clusterApiUrl("devnet"));

    //generate keypair and airdrop 1000000000 Lamports (1 SOL)
    const myKeypair = new PublicKey("7Sv2c1iGcG9YD4YM4ZJ1U6oBPK7EH5rjgXLre5yt7VeJ")
    await connection.requestAirdrop(myKeypair, 1000000000);

     log('solana public address: ' + myKeypair.toBase58());

    //set timeout to account for airdrop finalization
    let mint;
    var myToken
    setTimeout(async function(){ 

        //create mint
        mint = await createMint(connection, myKeypair, myKeypair.publicKey, null, 9, TOKEN_PROGRAM_ID)

        //  log('mint public address: ' + mint.publicKey.toString());

        //get the token accont of this solana address, if it does not exist, create it
        myToken = await mint.getOrCreateAssociatedAccountInfo(
            myKeypair
        )

         log('token public address: ' + myToken.address.toString());

         log('done');

    }, 80000);

})();