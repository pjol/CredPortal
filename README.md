# CRED PORTAL

This project was created for the EthGlobal San Francisco Hackathon!

Cred Portal is a front-end integration with Cali-Creds, which utilizes the California Mobile Driver's License and Succinct's SP1 to generate ZK Proofs of identity attestations, which can be turned into on-chain nft-like tokens, or Creds. The app is a user friendly look into these on-chain credentials, with the ability to provide in-person confirmation of credential ownership by leveraging Coinbase's Smart Wallet.


## Getting Started

To run locally

Copy the example.env file to a local .env, and enter a valid Polygon Amoy RPC URL

```bash
cp example.env .env
```

NOTE: Do not change the EXAMPLE_TOKEN_ID field, as currently this is necessary in order to properly query for Cred metadata


Then, start the project!

```bash
npm run dev
```
