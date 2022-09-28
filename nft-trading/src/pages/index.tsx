import type { NextPage } from "next";
import Head from "next/head";
import AirdropCards from "../components/AirdropCards";
import ProfileCarousel from "../components/profile/ProfileCarousel";
import FAQ from "../components/FAQ";
import FrontHero from "../components/FrontHero";
import NFTCollection from "../components/NFTCollection";
import Partners from "../components/Partners";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {

  const { data: session } = useSession()
  console.log(session)

  return (
    <div >
      <Head>
        <title>BazaarMarket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen scrollbar-hide" >
        <div className="max-w-sm md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto ">
          <section>
            <FrontHero />
          </section>
          <section>
            <Partners />
          </section>
          <section>
            <AirdropCards />
          </section>
          <section>
            <div className="mt-12">
              <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">Featured Collections</h1>
                <p className="font-poppins text-lg mt-5">Check out these popular collections</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
                              max-w-lg md:max-w-3xl xl:max-w-7xl mx-auto mt-10 
                              gap-6 xl:gap-8">
                <NFTCollection />
              </div>
            </div>
          </section>
          {/* <section>
            <ProfileCarousel />
          </section> */}
          <section className="mb-10">
            <FAQ />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;

