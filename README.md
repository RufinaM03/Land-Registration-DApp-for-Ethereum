# Land-Registration-DApp-for-Ethereum

# 🏞️ Land Registration DApp for Ethereum

A decentralized application (DApp) for secure, transparent, and efficient land registration built on the Ethereum blockchain.

## 🚀 Project Overview

This DApp enables users to:

- 🧑‍🌾 Register themselves as landowners
- 🌍 Register land details securely
- 🔍 Search for land by ID
- 💰 Set land for sale and define pricing
- 🤝 Buy/sell land directly between users
- 🔐 Use zero-knowledge proofs for validation
- ☁️ Store property documents using IPFS

The backend is powered by **Smart Contracts** (Solidity, Truffle), while the frontend is built using **React.js** and styled with **Tailwind CSS**.

## 🛠 Tech Stack

| Layer          | Tech Used                         |
| -------------- | --------------------------------- |
| Blockchain     | Ethereum (Ganache), Solidity      |
| Framework      | Truffle                           |
| Frontend       | React.js, Tailwind CSS            |
| Wallet         | MetaMask                          |
| Storage        | IPFS (via Web3.Storage or Pinata) |
| Backend Server | Node.js, Express                  |
| Zero-Knowledge | Circom, ZK Proofs                 |

## 📁 Project Structure

```plaintext
Land-Registration-DApp/
├── backend/
│   ├── contracts/             # Solidity contracts (LandRegistry, Verifier)
│   ├── migrations/            # Deployment scripts
│   ├── scripts/               # Upgrade/test scripts
│   ├── src/                   # Express server code (controllers, routes)
│   └── zk/                    # ZK Proofs & circuits
├── frontend/
│   ├── public/                # index.html
│   └── src/                   # React components, APIs, utilities
└── README.md
```
