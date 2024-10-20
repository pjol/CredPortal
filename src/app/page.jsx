import defaultContracts from "./defaultContracts"
import CredCard from "./CredCard.jsx"
import CredChecker from "./CredChecker.jsx"
import abi from "./credAbi"
import { Contract, JsonRpcProvider } from "ethers";
import "dotenv";

export default function Home() {

  const getCredMetadata = async (contractAddress) => {
    const provider = new JsonRpcProvider(process.env.RPC_URL)
    let contract = new Contract(contractAddress, abi, provider)
    const token = process.env.EXAMPLE_TOKEN_ID
    // Metadata in contract currently depends on querying for a specific token - will be fixed.
    const ipfsAddress = await contract.tokenURI(token)
    const hash = ipfsAddress.split("//")[1]
    const metadataURL = "https://ipfs.io/ipfs/" + hash
    console.log(metadataURL)
    const metadataRes = await fetch(metadataURL)
    // console.log(metadataRes)
    const metadata = metadataRes.json()
    console.log(metadata)
  }


  const getCred = async (account, chainId, contractAddress) => {
    "use server"
    const provider = new JsonRpcProvider(process.env.RPC_URL)
    let contract = new Contract(contractAddress, abi, provider)
    const credIds = await contract.ownerCredIds(account)
    console.log("creds")
    console.log(credIds)
    const cred = await contract.cred(credIds[0])
    console.log("name")
    console.log(cred)
    console.log(cred[2])
  }


  const bodyStyle = {
    display: "flex",
    backgroundColor: "whitesmoke"
  }

  const paperStyle = {
    display: "flex",
    borderRadius: "15px",
    height: "80vh",
    marginTop: "10vh",
    width: "80vw",
    marginLeft: "10vw",
    backgroundColor: "white"
  }


  return (
    <div style={bodyStyle}>
      <div style={paperStyle}>
        {defaultContracts.map((c, index) => {
          const metadata = getCredMetadata(c.contractAddress)

          return (
            <CredChecker
              chainId={c.chainId}
              contractAddress={c.contractAddress}
              name={c.name}
              getCred={getCred}
              key={index}
            />
          )
        }
        )}
      </div>
    </div>
  );
}
