import NFTCategory from "./NFTCategory"
import NFTCollectionAvatar from "./NFTCollectionAvatar"
import NFTCreatorAvatar from "./NFTCreatorAvatar"
import NFTDetails from "./NFTDetails"
import NFTRank from "./NFTRank"
import type { NFT } from '../../../types'

function NFTInfo({ nft }: { nft: NFT }) {
    return (
        <div className="mt-28">
            <div className="bg-white flex flex-col space-y-10 bg-opacity-25 backdrop-blur-xl rounded-2xl shadow-md p-5">
                <div className="flex justify-between">
                    {nft.owner && <NFTCreatorAvatar creator={nft.owner} />}
                    <NFTCollectionAvatar />
                </div>
                <NFTRank />
                <p className="font-poppins">
                    {nft.description}
                </p>
                <NFTCategory />
                <div className="mx-12 mt-5">
                    <NFTDetails />
                </div>
            </div>
        </div>
    )
}

export default NFTInfo
