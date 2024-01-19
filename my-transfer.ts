import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
  } from '@solana/web3.js';
import 'dotenv/config';
import { getKeypairFromEnvironment } from '@solana-developers/node-helpers';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const transaction = new Transaction();

const senderKeypair = (getKeypairFromEnvironment('SECRET_KEY'));
const senderPubkey = new PublicKey(senderKeypair.publicKey);
const toPubKey = new PublicKey(getKeypairFromEnvironment('SECRET_KEY_2').publicKey)

const instruction = SystemProgram.transfer({
    fromPubkey: senderPubkey,
    toPubkey: toPubKey,
    lamports: 5
})

transaction.add(instruction)

const signature = await sendAndConfirmTransaction(
    connection, 
    transaction, 
    [senderKeypair]
)

console.log(`\nYou can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet\n`)