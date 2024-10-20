"use client"

import getCred from "../../getCred.js"
import getCredMetadata from "../../getCredMetadata.js"
import { useState, useEffect } from "react"
import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import { CircularProgress } from "@nextui-org/progress";
import defaultContracts from "../../defaultContracts.js"

const CredChecker = ({params}) => {
  const chainId = params.chainId
  const contractAddress = params.contractAddress
  const field = defaultContracts.filter((contract) => {
    return chainId == contract.chainId && contractAddress == contract.contractAddress
  })[0]?.fieldName
  const [metadata, setMetadata] = useState()
  const [loading, setLoading] = useState(false)
  const [attestation, setAttestation] = useState()

  useEffect(() => {
    const getMetadata = async () => {
      let m = await getCredMetadata(contractAddress)
      setMetadata(m)
    }
    getMetadata()
  }, [])

  const bodyStyle = {
    display: "flex",
    backgroundColor: "whitesmoke"
  }

  const paperStyle = {
    color: "black",
    borderRadius: "15px",
    textAlign: "center",
    height: "80vh",
    marginTop: "10vh",
    width: "80vw",
    marginLeft: "10vw",
    backgroundColor: "white"
  }

  const imgStyle = {
    width: "min(250px, 40vw)",
    height: "min(250px, 40vw)"
  }

  const headerStyle = {
    margin: "30px",
    fontSize: "min(70px, 9vw)",
    color: "black",
    fontWeight: "bold",
    marginBottom: "20px"
  }

  const descriptionStyle = {
    width: "60vw",
    fontSize: "min(25px, 4vw)",
    margin: "auto",
    marginBottom: "0px",
    padding: "20px",
    paddingBottom: "0px",
  }

  const dataStyle = {
    fontSize: "min(15px, 2vw)",
  }

  const buttonStyle = {
    height: "60px",
    width: "160px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#eb6c6c",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "15px",
    "&:hover": {
      backgroundColor: "#D46361"
    }
  }

  const attestationStyle = {
    width: "60vw",
    fontSize: "min(30px, 5vw)",
    fontWeight: "bold",
    margin: "auto",
    marginBottom: "0px",
    padding: "20px",
    paddingBottom: "20px",
  }


  const connect = async () => {
    try {
      setLoading(true)
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
      const cred = await getCred(acc[0], chainId, contractAddress)
      setAttestation(cred)
      console.log(cred)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const reset = () => {
    setAttestation()
  }



  return (
    <div style={bodyStyle}>
      <div style={paperStyle}>
        {loading ? <div style={{textAlign: "center"}}>
            <CircularProgress size="lg" color="#eb6c6c" aria-label="Loading..." />
            <div>Loading...</div>
         </div> : <>
         {
          attestation ? <div>
            <div style={headerStyle}>{"Attested!"}</div>
            <img style={imgStyle} src={"/checkmark.png"}/>
            <div style={attestationStyle}>{field}: {attestation[2]}</div>
            <button style={buttonStyle} onClick={reset}>Reset</button>
          </div> : <>
            <div style={headerStyle}>{metadata?.name}</div>
            <img style={imgStyle} src={metadata?.image}/>
            <div style={descriptionStyle}>{metadata?.description}</div>
            <button style={buttonStyle} onClick={connect}>Check for Cred</button>
            <p style={dataStyle}>Chain ID: {chainId}</p>
            <p style={dataStyle}>Address: {contractAddress}</p>
          </>
         }
         </>
         }
      </div>
    </div>
  )
}

export default CredChecker