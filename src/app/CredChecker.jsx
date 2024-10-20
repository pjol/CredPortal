"use client"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import { useState, useEffect } from "react";

const CredChecker = ({ chainId, contractAddress, name, getCred }) => {
  const [accounts, setAccounts] = useState()

  useEffect(() => {
    if(accounts) {
      const creds = []
      accounts.map((acc) => {
        const c = getCred(acc, chainId, contractAddress)
        if(c) {
          creds.push({
            account: acc,
            value: c.value,
            timestamp: c.timestamp
          })
        }
      })
    }
  }, [accounts])

  const connect = async () => {
    console.log("connect")
    const sdk = new CoinbaseWalletSDK({
      appName: 'CredPortal',
      appChainIds: [chainId]
    });
    console.log(sdk)
    let p = sdk.makeWeb3Provider({options: "eoaOnly"})
    await p.request({method: "eth_requestAccounts"})
    const acc = await p.request({method: "eth_accounts"})
    await p.disconnect()
    getCred(acc[0], chainId, contractAddress)
    setAccounts(acc)
  }

  return (
    <div style={{color: "black"}} onClick={connect}>
      <p>Chain ID: {chainId}</p>
      <p>Address: {contractAddress}</p>
      <p>Name: {name}</p>
    </div>
  )
}

export default CredChecker