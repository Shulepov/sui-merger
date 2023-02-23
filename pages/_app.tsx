import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout/Layout";

import {
  WalletProvider,
  Chain,
  SuiTestnetChain,
  SuiDevnetChain,
} from '@suiet/wallet-kit';

const SupportedChains: Chain[] = [
  SuiDevnetChain
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SUI coins merger</title>
        <meta
          name="description"
          content=""
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletProvider chains={SupportedChains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </>
  );
}
