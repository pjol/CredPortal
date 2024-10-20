import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import defaultContracts from "./defaultContracts"
import CredChecker from "./CredChecker"

export default function Home() {
  const CoinbaseWalletSDK = useMemo(() => dynamic(() => {
    return import("@coinbase/wallet-sdk")
  }
  ), [])

  const sdk = new CoinbaseWalletSDK({
    appName: 'CredPortal',
    appChainIds: new Set(defaultContracts.map((c) => c.chainId))
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {defaultContracts.map((c, index) => <CredChecker
          chainId={c.chainId}
          contractAddress={c.contractAddress}
          name={c.name}
          key={index}
          sdk={sdk}
        />)}
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
