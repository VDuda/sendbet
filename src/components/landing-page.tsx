'use client'

import { useState, useEffect } from 'react'
import { Twitter, Share2, Home, FileText, Eye, Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { EscrowButton } from "@/components/ui/EscrowButton"
import { BitcoinButton } from "@/components/ui/BitcoinButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { createPrivateKeyFromString, createAndSendTransaction, broadcastTransaction} from "@/components/wallet/multisig";

// TODO - This is how we can use Bitcoin wallet as a custodian for the escrow
// Main function to create and send a transaction
// (async () => {
//   // Will be used to generate a sessions wallet
//   try {
//     const inputString = 'your unique string here'; // Input string
//     // ${WALLET_PRIVATE_KEY}
//     const privateKeyHex = await createPrivateKeyFromString(inputString);
//     console.log('Generated Private Key (Hex):', privateKeyHex);
//   } catch (error) {
//     console.error(error);
//   }
//   // Example private key (you can replace it with your own)
//   const buyerHexKey = '${BUYER_WALLET_PRIVATE_KEY}'; // Buyer private key in hex

//   // Recipient address and amount to send (in satoshis)
//   const recipientAddress = "${TARGET_WALLET_PRIVATE_KEY}"; // Replace with a real Bitcoin testnet address
//   const amount = 2000; // Amount in satoshis

//   try {
//     // Create and sign the transaction
//     console.log("Creating transaction...");
//     const rawTx = await createAndSendTransaction(buyerHexKey, recipientAddress, amount);
//     console.log("Signed Transaction Hex:", rawTx);

//     // Broadcast the transaction to the Bitcoin network
//     await broadcastTransaction(rawTx);
//     console.log("Transaction broadcasted successfully!");
//   } catch (error) {
//     console.error("Failed to create and broadcast transaction:", error);
//   }
// })();


export function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [betInput, setBetInput] = useState('')
  const [contract, setContract] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pdfProgress, setPdfProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoSize = Math.min(60 + scrollY * 0.1, 120)

  const generateBet = () => {
    const terms = `
    BET CONTRACT AGREEMENT

    THIS BET CONTRACT AGREEMENT is entered into this ____ day of _______________, 20______, by and between SendBet, a company duly organized and existing under the laws of the State of _______________, with its principal place of business located at ________________________________, and the undersigned bettor(s) (hereinafter referred to as "Parties").

    1. BET: The Parties agree to the following bet: ${betInput}

    2. DATE: This bet is placed on ${new Date().toLocaleDateString()}.

    3. CONSIDERATION: In consideration of the mutual covenants and agreements contained herein, the Parties agree to the following:

       a. The bettor(s) shall pay the agreed-upon stake to SendBet.

       b. Upon conclusion of the bet, SendBet shall process payment to the winning party in accordance with the terms of this contract.

    4. TERMINATION: This contract may be terminated by either Party with written notice to the other Party.

    5. FRAUDULENT BETS: SendBet reserves the right to terminate this contract and nullify any bet found to be fraudulent or in violation of these terms.

    6. GOVERNING LAW: This contract is governed by the laws of the jurisdiction in which the bet is placed.

    7. ENTIRE AGREEMENT: This contract constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior or contemporaneous agreements, understandings, and representations, written or oral, between the Parties with respect to such subject matter.

    IN WITNESS WHEREOF, the Parties have executed this Bet Contract Agreement as of the date first above written.
    `
    setContract(terms)
    setIsModalOpen(true)
  }

  const shareBet = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SendBet Contract',
        text: contract,
        url: 'https://Sendbet.click'
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported on this browser. Please copy the contract text manually.')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <nav className="w-[120px] bg-gray-900 fixed h-full flex flex-col items-center py-4 hidden sm:flex">
        <div 
          style={{ 
            width: `${logoSize}px`, 
            height: `${logoSize}px`,
            transition: 'width 0.3s, height 0.3s',
          }} 
          className="bg-white rounded-full flex items-center justify-center text-black font-bold text-2xl mb-8"
        >
          SB
        </div>
        <Link href="#" className="w-full p-4 hover:bg-gray-800 flex flex-col items-center">
          <Home size={24} />
          <span className="mt-2 text-xs">HOME</span>
        </Link>
        <Link href="#contract" className="w-full p-4 hover:bg-gray-800 flex flex-col items-center">
          <FileText size={24} />
          <span className="mt-2 text-xs">CONTRACT</span>
        </Link>
        <Link href="#resolution" className="w-full p-4 hover:bg-gray-800 flex flex-col items-center">
          <Eye size={24} />
          <span className="mt-2 text-xs">RESOLUTION</span>
        </Link>
        <Link href="#" onClick={shareBet} className="w-full p-4 hover:bg-gray-800 flex flex-col items-center">
          <Share2 size={24} />
          <span className="mt-2 text-xs">SHARE</span>
        </Link>
      </nav>

      {/* Mobile navbar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <div className="flex justify-around p-4">
          <Link href="#" className="flex flex-col items-center">
            <Home size={20} />
            <span className="text-xs mt-1">HOME</span>
          </Link>
          <Link href="#contract" className="flex flex-col items-center">
            <FileText size={20} />
            <span className="text-xs mt-1">CONTRACT</span>
          </Link>
          <Link href="#resolution" className="flex flex-col items-center">
            <Eye size={20} />
            <span className="text-xs mt-1">RESOLUTION</span>
          </Link>
          <Link href="#" onClick={shareBet} className="flex flex-col items-center">
            <Share2 size={20} />
            <span className="text-xs mt-1">SHARE</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 sm:ml-[120px]">
        <header className="text-center py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            SendBet <span className="text-primary">(AI)</span>
          </h1>
          <p className="text-xl text-gray-400">Contract Generator</p>
        </header>

        <section className="max-w-3xl mx-auto space-y-8">
          <div className="bg-gray-800 rounded-lg p-4 w-full flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Prompt contract generator..."
              className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none border-none"
              value={betInput}
              onChange={(e) => setBetInput(e.target.value)}
            />
            <Button onClick={generateBet} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Generate Contract
            </Button>
          </div>

          <section id="contract" className="space-y-6">
            <h2 className="text-2xl font-bold">Contract</h2>
            <p className="text-gray-400">
              Disclaimer: This is a sample contract generated by AI. Please review carefully and consult with legal professionals before entering into any binding agreements.
            </p>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="whitespace-pre-wrap">{contract}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Generating PDF...</span>
                <span>{pdfProgress}%</span>
              </div>
              <Progress value={pdfProgress} className="w-full" />
              <Button className="w-full" disabled={pdfProgress < 100}>
                <Download className="mr-2 h-4 w-4" /> Download Contract
              </Button>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-bold">Payment</h3>
            <div >
              <EscrowButton />
              <BitcoinButton />
            </div>
            <div className="space-y-4">
              <div>
                <p className="mb-2">Sender Payment</p>
                <Progress value={100} className="w-full" />
              </div>
              <div>
                <p className="mb-2">Receiver Payment</p>
                <Progress value={75} className="w-full" />
              </div>
              <div>
                <p className="mb-2">Signatures</p>
                <Progress value={50} className="w-full" />
              </div>
            </div>
          </section>

          <section id="resolution" className="space-y-6">
            <h3 className="text-xl font-bold">Resolution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-600 p-6 rounded-lg text-center">
                <h4 className="text-2xl font-bold mb-4">Approve</h4>
                <Button variant="secondary">Sign</Button>
              </div>
              <div className="bg-red-600 p-6 rounded-lg text-center">
                <h4 className="text-2xl font-bold mb-4">Reject</h4>
                <Button variant="secondary">Sign</Button>
              </div>
            </div>
          </section>
        </section>

        <footer className="mt-12 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Twitter className="w-6 h-6" />
            <Share2 className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-500">
            © 2024 SendBet. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Bet Contract Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Bet Contract</DialogTitle>
            <DialogDescription>
              Here are the terms of your bet. Please review carefully.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-100 rounded-md text-black whitespace-pre-wrap">
            {contract}
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={shareBet} className="flex items-center space-x-2">
              <Share2 size={16} />
              <span>Share Bet</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}