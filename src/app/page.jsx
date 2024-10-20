import styles from "./page.module.css";
import defaultContracts from "./defaultContracts"
import CredChecker from "./CredChecker.jsx"

export default function Home() {

  const credAbi = [
    "function tokenURI(uint256 tokenId) public view override returns (string memory)",
    "function ownerCredIds(address owner) external view returns(uint256[] memory)",
    "function cred(uint256 id) external view returns(Cred memory)",
  ]

  const getCred = async (account, chainId, contractAddress) => {
    "use server"
  }

  let c = defaultContracts


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {c.map((c, index) => <CredChecker
          chainId={c.chainId}
          contractAddress={c.contractAddress}
          name={c.name}
          getCred={getCred}
          key={index}
        />)}
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
