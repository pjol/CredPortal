"use client"
import { useRouter } from "next/navigation"

const CredCard = ({ chainId, contractAddress, name, metadata }) => {
  const router = useRouter()

  const cardStyle = {
    color: "black",
    textAlign: "center",
    margin: "min(50px, 10vw)",
    padding: "10px",
    borderRadius: "10px",
    borderColor: "lightgray",
    borderWidth: "1px",
    borderStyle: "solid",
    fontFamily: "Arial, Helvetica, sans-serif",
    cursor: "pointer",
    width: "min(300px, 60vw)",
    height: "min(400px, 50vh)",
    "&:hover": {
      backgroundColor: "whitesmoke"
    }
  }

  const nameStyle = {
    fontWeight: "bold",
    fontSize: "30px"
  }

  const imgStyle = {
    width: "min(250px, 50vw)",
    height: "min(250px, 50vw)",
    padding: "15px",
  }

  return (
    <div style={cardStyle} onClick={() => router.push(chainId + "/" + contractAddress)}>
      <img style={imgStyle} src={metadata.image}/>
      <p style={nameStyle}>{name}</p>
      <p>Chain ID: {chainId}</p>
    </div>
  )
}

export default CredCard