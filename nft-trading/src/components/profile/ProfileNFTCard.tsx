import Link from "next/link"
import { NFT } from "../../../types"

function ProfileNFTCard({ nft }: { nft: NFT }) {
    return (
        <Link href={`/nft/${nft.token_address}/${nft.token_id}`}>
            <div className="card card-normal w-96 mx-auto lg:w-80 xl:w-96 shadow-xl bg-white bg-opacity-50 backdrop-blur-xl cursor-pointer">
                <img src={nft.image} className="rounded-xl p-5" />
                <div className="card-body text-center">
                    <h2 className="text-center font-bold text-2xl">{nft.name}</h2>
                    <div className="flex justify-evenly mt-4">
                        {/* <div className="flex items-center space-x-4">
                            <img src={src} className="rounded-full h-12 w-12 " />
                            <p>Creator</p>
                        </div> */}
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <p>100</p>
                        </div>
                    </div >
                </div>
            </div >
        </Link>
    )
}

export default ProfileNFTCard
