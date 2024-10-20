import defaultContracts from "./defaultContracts.js"
import CredCard from "./CredCard.jsx"
import getCredMetadata from "./getCredMetadata.js"
import "dotenv";

export default function Home() {

  const bodyStyle = {
    display: "flex",
    backgroundColor: "whitesmoke"
  }

  const paperStyle = {
    borderRadius: "15px",
    textAlign: "center",
    height: "80vh",
    marginTop: "10vh",
    width: "80vw",
    marginLeft: "10vw",
    backgroundColor: "white"
  }

  const headerStyle = {
    margin: "50px",
    fontSize: "min(70px, 9vw)",
    color: "black",
    fontWeight: "bold",
    marginBottom: "20px"
  }

  const explorerStyle = {
    margin: "auto",
    height: "60vh",
    overflowX: "clip",
    overflowY: "scroll"
  }

  return (
    <div style={bodyStyle}>
      <div style={paperStyle}>
        <div style={headerStyle}>Cred Portal</div>
        <div style={explorerStyle}>
        {defaultContracts.map(async (c, index) => {
          const metadata = await getCredMetadata(c.contractAddress)
          return (
            <CredCard
              chainId={c.chainId}
              contractAddress={c.contractAddress}
              metadata={metadata}
              name={c.name}
              key={index}
            />
          )
        }
        )}
        </div>
      </div>
    </div>
  );
}
