import React, { useState } from "react";
import "./style.css"

const BitcoinButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bitcoinAddress, setBitcoinAddress] = useState("1BitcoinAddressHere");
  const [amount, setAmount] = useState("0.001");
  const [qrCodeUrl, setQrCodeUrl] = useState(
    `https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:${bitcoinAddress}?amount=${amount}&size=200x200`
  );

  // Function to open the modal
  const openModal = () => {
    generateBitcoinQrCode(); // Ensure the QR code is up-to-date
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to generate QR code
  const generateBitcoinQrCode = () => {
    const updatedQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:${bitcoinAddress}?amount=${amount}&size=200x200`;
    setQrCodeUrl(updatedQrCodeUrl);
  };

  return (
    <div>
      <button className="BitcoinButtonPrimary" onClick={openModal}>
        Add Funds via Bitcoin
      </button>

      {/* Modal popup */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Funds with Bitcoin</h2>
            <p>Scan the QR code to make a Bitcoin payment</p>

            <img
              id="barcode"
              src={qrCodeUrl}
              alt="Bitcoin QR Code"
              title="Bitcoin QR Code"
              width="200"
              height="200"
            />
            <div>
                <label htmlFor="amount">Send X.XX (BTC)</label>
            </div>
            {/* <div>
              <label htmlFor="amount">Amount (BTC):</label>
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100px", margin: "10px" }}
              />
              <label htmlFor="bitcoinAddress">Bitcoin Address:</label>
              <input
                id="bitcoinAddress"
                type="text"
                value={bitcoinAddress}
                onChange={(e) => setBitcoinAddress(e.target.value)}
                style={{ width: "300px", margin: "10px" }}
              />
              <button onClick={generateBitcoinQrCode}>Update QR Code</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export {BitcoinButton};
