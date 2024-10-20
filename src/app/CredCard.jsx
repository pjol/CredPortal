const CredCard = ({ chainId, contractAddress, name }) => {

  const cardStyle = {
    color: "black",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    borderColor: "lightgray",
    borderWidth: "1px",
    borderStyle: "solid",
    fontFamily: "Arial, Helvetica, sans-serif",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "whitesmoke"
    }
  }

  const nameStyle = {
    fontWeight: "bold"
  }

  return (
    <div style={cardStyle}>
      <p style={nameStyle}>Name: {name}</p>
      <p>Chain ID: {chainId}</p>
      <p>Address: {contractAddress}</p>
    </div>
  )
}

export default CredCard