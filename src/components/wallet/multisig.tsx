// // Your updated multisig.tsx file content here
// import * as bitcore from "bitcore-lib";
// import axios from "axios";
// import crypto from 'crypto';

// // Async function to generate a private key hex from a string
// export async function createPrivateKeyFromString(inputString: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       try {
//         // Hash the input string using SHA256 to generate a 32-byte hash
//         const hash = crypto.createHash('sha256').update(inputString).digest('hex');
    
//         // Create a new bitcore PrivateKey object from the hash
//         const privateKey = new bitcore.PrivateKey(hash);
    
//         // Return the private key in hex format
//         resolve(privateKey.toString());
//       } catch (error) {
//         reject('Failed to generate private key: ' + error.message);
//       }
//     });
//   }

// // Function to create a multisig address
// export function createMultisigAddress(buyerPubKey: any, sellerPubKey: any, escrowPubKey: any): string {
//   const publicKeys = [buyerPubKey, sellerPubKey, escrowPubKey];
//   const address = new bitcore.Address(publicKeys, 2); // 2 of 3 signatures required
//   return address.toString();
// }

// // Fetch detailed information about a transaction output to retrieve the scriptPubKey
// async function getTxDetails(txid: string) {
//     try {
//       const { data: txDetails } = await axios.get(`https://blockstream.info/api/tx/${txid}`);
//       return txDetails;
//     } catch (error) {
//       console.error(`Failed to fetch transaction details for txid ${txid}:`, error);
//       return null;
//     }
//   }

// // Updated function to retrieve UTXOs and enrich them with scriptPubKey
// export async function getUTXOs(address: string) {
//     try {
//       const { data: utxos } = await axios.get(`https://blockstream.info/api/address/${address}/utxo`);
      
//       // Enrich UTXOs with scriptPubKey
//       const enrichedUtxos = await Promise.all(
//         utxos.map(async (utxo: any) => {
//           const txDetails = await getTxDetails(utxo.txid);
//           if (txDetails) {
//             const scriptPubKey = txDetails.vout[utxo.vout].scriptpubkey;
//             const amount = txDetails.vout[utxo.vout].value;
//             return {
//               ...utxo,
//               scriptPubKey: scriptPubKey, // Add scriptPubKey to the UTXO
//               amount: amount
//             };
//           }
//           return utxo;
//         })
//       );
  
//       return enrichedUtxos;
//     } catch (error) {
//       console.error("Failed to fetch UTXOs:", error);
//       return [];
//     }
//   }

// // function to broadcast a transaction on blockstream
// export async function broadcastTransaction(rawTx: string) {
//     try {
//       const response = await axios.post('https://blockstream.info/api/tx', rawTx);
//       console.log("Transaction successfully broadcast:", response.data);
//     } catch (error) {
//       console.error("Error broadcasting transaction:", error);
//     }
//   }

// const estimateTransactionFee = (txSizeBytes, feeRatePerByte) => {
// return txSizeBytes * feeRatePerByte;
// };

// // Function to create and send a transaction
// export async function createAndSendTransaction(buyerHexKey, recipientAddress, amount) {
//     // Convert the private key hex into a bitcore.PrivateKey object
//     const buyerKey = new bitcore.PrivateKey(buyerHexKey);
//     const buyerAddress = buyerKey.toAddress();
//     console.log("Buyer Address:", buyerAddress.toString());
  
//     // Fetch UTXOs for the buyer's address
//     const utxos = await getUTXOs(buyerAddress.toString());
//     console.log("UTXOs:", JSON.stringify(utxos, null, 2));
  
//     if (!utxos.length) {
//       throw new Error("No UTXOs found for this address.");
//     }
  
//     // Format UTXOs correctly for bitcore-lib
//   const formattedUtxos = utxos.map(utxo => ({
//     txId: utxo.txid,
//     outputIndex: utxo.vout,
//     script: utxo.scriptPubKey,
//     satoshis: utxo.value // Ensure this is in satoshis
//   }));

//   // Calculate the total value of UTXOs in satoshis
//   const totalUtxoValue = formattedUtxos.reduce((acc, utxo) => acc + utxo.satoshis, 0);
//   console.log("Total UTXO Value:", totalUtxoValue);

//   // Transaction Fee Calculation
//   const feeRatePerByte = 10; // Adjust based on network conditions
//   const transactionSizeEstimate = 250; // Approximate size in bytes
//   const fee = estimateTransactionFee(transactionSizeEstimate, feeRatePerByte);
//   console.log("Estimated Fee:", fee);

//   // Check that total amount to send + fee <= totalUtxoValue
//   const totalAmountToSend = amount + fee;

//   if (totalAmountToSend > totalUtxoValue) {
//     throw new Error("Insufficient UTXO value to cover amount and fee.");
//   }

//   // Create the transaction
//   const tx = new bitcore.Transaction()
//     .from(formattedUtxos)
//     .to(recipientAddress, amount) // amount in satoshis
//     .fee(fee)
//     .change(buyerAddress)
//     .sign(buyerKey);

//   // Check if the transaction is fully signed
//   if (!tx.isFullySigned()) {
//     console.log("Transaction not fully signed:", tx.toObject());
//     throw new Error("Transaction has not been fully signed.");
//   }

//   return tx.serialize();
// }