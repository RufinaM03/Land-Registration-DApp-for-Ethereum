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
## ⚙️ Setup Instructions
1. Clone the Repository
```bash
git clone https://github.com/RufinaM03/Land-Registration-DApp-for-Ethereum.git
cd Land-Registration-DApp-for-Ethereum
```

3. Install Dependencies
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```

5. Start Local Blockchain (Ganache)
Make sure Ganache is running on port 7545 (or modify web3Config.js accordingly).

6. Compile & Deploy Smart Contracts
```bash
cd ../backend
truffle compile
truffle migrate --network development
```

8. Start Backend Server
```bash
node src/index.js
```

7. Start Frontend
```bash
cd ../frontend
npm start
```
Visit http://localhost:3000 in your browser.

Fetching the account address from metmask

![image](https://github.com/user-attachments/assets/86866ee3-d017-425c-a350-b6b996e5efe8)

User Regsitration

![image](https://github.com/user-attachments/assets/25e078f6-5822-4f70-b0ae-f95d62cfd288)

Unique Identity Commitment Generation (to be used as an input for zkp generation)

![image](https://github.com/user-attachments/assets/9d87cfd3-6a00-4a82-804f-76af5165fcee)

Home Page

![image](https://github.com/user-attachments/assets/e848d8ef-9dff-4fbd-b702-19abda429b80)

Property Registration

![image](https://github.com/user-attachments/assets/4aa2ffe9-b0a4-4601-933e-102aa41873b6)

Upload Document to IPFS

![image](https://github.com/user-attachments/assets/976d0d6d-36ca-41eb-84b2-3f0a41dc13dd)

Transaction Details and generated zk proof at the backend terminal

![image](https://github.com/user-attachments/assets/2cdeaa75-33b3-476f-bb1a-42efee698dc3)

Updating property price

![image](https://github.com/user-attachments/assets/3207c411-a829-419b-a4e3-fc4116b5c1b4)

Checking if a property is for sale or not

![image](https://github.com/user-attachments/assets/88de3a0b-61cf-4bc8-9a5b-10a2c91125cf)

Initiating Property Sale

![image](https://github.com/user-attachments/assets/368db00b-0efc-4999-86f1-4c72fb9a4f61)

Realtime Broadcasting of Property Details to the network

![image](https://github.com/user-attachments/assets/f4be3e3e-2003-4c06-9ec1-0da16d9b7392)

To check your account details or to log out from the session

![image](https://github.com/user-attachments/assets/78ae14d3-ce29-489a-a232-d404946b25b5)

A new user - John Doe registers

![image](https://github.com/user-attachments/assets/cd636e51-5f86-4f83-8169-197885c2e710)

John Doe found the details of the registered property (id: 101)

![image](https://github.com/user-attachments/assets/dc83876b-ca60-40d5-8c90-0e7bade38894)

John Doe checks the sale status of this proeprty

![image](https://github.com/user-attachments/assets/e823eee1-5ef5-42a2-a6bc-03d58c211b50)

John Doe initiates purchase request

![image](https://github.com/user-attachments/assets/edabb53f-6080-4060-a5f0-858f6c1703ac)

Pending Payment State

![image](https://github.com/user-attachments/assets/d718770c-dc80-461d-8308-5868721d3831)

zk-SNARK proof generation for Purchase Transaction

![image](https://github.com/user-attachments/assets/65aec615-eccc-446c-95ea-4d69402d4597)

Metamask Confirmation of Payment

![image](https://github.com/user-attachments/assets/ead04f15-5129-4127-bcaf-af02fc49669f)

ETH Transfer Confirmation

![image](https://github.com/user-attachments/assets/4ed3ef11-9408-4472-8c2a-f32ebfaebbc0)

Ownership Succesfully transferred (owner address has been updated)

![image](https://github.com/user-attachments/assets/010cf3b8-d931-40cd-abfb-537daf721c57)

We can see that owner address is linked to John Doe's User Profile 

![image](https://github.com/user-attachments/assets/8bba537b-8504-430f-9999-33db054f9ded)


🛡️ Security

Smart contracts are self-contained and tested

Users interact via MetaMask

ZK Proofs ensure transaction privacy


🌐 Links

[GitHub Repository](https://github.com/RufinaM03/Land-Registration-DApp-for-Ethereum.git)
