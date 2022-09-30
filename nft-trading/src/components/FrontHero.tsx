import Link from "next/link"

function FrontHero() {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto mt-32">
                <img src="/heroimage.png" className="max-w-sm rounded-lg" />
                <div className='mr-10'>
                    <h1 className="text-5xl font-bold font-poppins">Trade & Collect NFTs!</h1>
                    <p className="py-6 font-poppins">
                        Bazaar Market is an NFT bartering market that allows users to swap multiple NFTs with one another. We also have our own NFT project called Diffemon, it was generated using the Stable Diffusion text-to-image model while the creatures names and personalities were generated by GPT3. Users can sign in through Discord and mint a pack of 6 NFTs for free on polygon mainnet with the code PostThreadDevNTell and begin trading with each other.
                    </p>
                    <div className='flex space-x-4'>
                        <Link href="/collections">
                            <button className="btn btn-primary shadow-md">Explore</button>
                        </Link>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="">
                            <p className="font-bold text-xl">37k+</p>
                            <p className=" ">Artworks</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">20k+</p>
                            <p className="">Artists</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">99k+</p>
                            <p className="">Trades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrontHero