// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "../server/router";
import "../styles/globals.css";
import { themeChange } from 'theme-change'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppWrapper } from "../context/AppContext";
import { Toaster } from 'react-hot-toast';

const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)

import Footer from "../components/Footer";
import { ethers } from "ethers";
import NFTTraderSDK from "@nfttrader-io/sdk-js"

//wagmi.
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura'
//rainbow kit UI framework.
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.rinkeby, chain.polygon],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'MetaTraderZ',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const queryClient = new QueryClient()

const NFTTradersSDK = new NFTTraderSDK({
  ethers: ethers, //you need to provide the instance of ethers js library
  web3Provider: provider, //or an instance of ethers.providers.Web3Provider
  network: 'RINKEBY', //example: 'ETHEREUM', 'RINKEBY', 'POLYGON', 'MUMBAI', 'XDAI'
})


const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <SessionProvider session={session}>
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <div className="bg-gradient-to-tr from-primary via-secondary to-neutral">
              <Header />
              <Component {...pageProps} />
              <Footer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
