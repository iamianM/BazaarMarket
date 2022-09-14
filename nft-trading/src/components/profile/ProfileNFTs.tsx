import ProfileNFTCard from "./ProfileNFTCard"
import { NFT } from "../../../types"
import { useQuery } from "react-query"
import { Ring } from '@uiball/loaders'

function ProfileNFTs({ address }: { address: string | string[] | undefined }) {

    const { data: nfts, isLoading, isFetching } = useQuery('nfts', fetchNFTs)
    const isDownloading = isLoading || isFetching

    type NFTResult = {
        cursor: string
        page: number
        page_size: number
        result: []
        status: string
        total: number
    }

    async function fetchNFTs() {
        const response = await fetch(`/api/profile/nfts/${address}`)
        const fetchedNFTS: NFTResult = await response.json()
        let NFTs = Array<NFT>()
        fetchedNFTS?.result?.forEach((nft: any) => {
            const metadata = JSON.parse(nft.metadata)
            NFTs.push({
                token_address: nft.token_address,
                token_id: nft.token_id,
                name: metadata?.name,
                description: metadata?.description,
                image: metadata?.image,
            })
        })
        return NFTs
    }

    console.log(nfts)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2
        max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto mt-10
        gap-8">
            {isDownloading ?
                <div className="justify-center">
                    <Ring
                        size={40}
                        lineWeight={5}
                        speed={2}
                        color="black"
                    />
                </div> :
                nfts?.map((nft, index) => (
                    <div className="carousel-item">
                        <ProfileNFTCard key={index} nft={nft} />
                    </div>
                ))}
        </div>
    )
}

export default ProfileNFTs
