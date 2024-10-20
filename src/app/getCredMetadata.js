"use server"
import { Contract, JsonRpcProvider } from "ethers";
import abi from "./credAbi"


const getCredMetadata = async (contractAddress) => {
  "use server"
  const provider = new JsonRpcProvider(process.env.RPC_URL)
  let contract = new Contract(contractAddress, abi, provider)
  const token = process.env.EXAMPLE_TOKEN_ID
  // Metadata in contract currently depends on querying for a specific token - will be fixed.
  const ipfsAddress = await contract.tokenURI(token)
  const hash = ipfsAddress.split("//")[1]
  const metadataURL = "https://ipfs.io/ipfs/" + hash
  const metadataRes = await fetch(metadataURL)
  const metadata = await metadataRes.json()
  metadata.image = "https://ipfs.io/ipfs/" + metadata.image.split("//")[1]
  return metadata
}

export default getCredMetadata