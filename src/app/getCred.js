"use server"
import { Contract, JsonRpcProvider } from "ethers";
import abi from "./credAbi"

const getCred = async (account, chainId, contractAddress) => {
"use server"
  const provider = new JsonRpcProvider(process.env.RPC_URL)
  let contract = new Contract(contractAddress, abi, provider)
  const credIds = await contract.ownerCredIds(account)
  const cred = await contract.cred(credIds[0])
  return cred
}

export default getCred