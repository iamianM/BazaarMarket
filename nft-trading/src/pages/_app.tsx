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
import { useEffect } from 'react';
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)

import Footer from "../components/Footer";
//wagmi.
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
//rainbow kit UI framework.
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const { chains, provider } = configureChains(defaultChains, [publicProvider()])

const { connectors } = getDefaultWallets({
  appName: 'Babylon Traders',
  chains
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const queryClient = new QueryClient()

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
