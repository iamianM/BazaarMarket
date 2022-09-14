import { useRouter } from "next/router"
import NFTInfo from "../../components/nft/NFTInfo"
import NFTShowCard from "../../components/nft/NFTShowCard"
import type { NFT } from "../../../types"
import { useQuery } from "react-query"
import { Ring } from "@uiball/loaders"

function NFTPage() {
    const router = useRouter()
    const slug = router.query.slug
    // @ts-ignore
    const token_address = slug[0]
    // @ts-ignore
    const token_id = slug[1]

    const { data: nft, isLoading, isFetching } = useQuery('nft', () => fetchNFT())
    const isDownloading = isLoading || isFetching

    type NFTResult = {
        token_address: string
        token_id: string
        amount: number
        owner_of: string
        token_hash: string
        block_number_minted: string
        block_number: string
        transfer_index: []
        contract_type: string
        name: string
        symbol: string
        token_uri: string
        metadata: string
        last_token_uri_sync: Date
        last_metadata_sync: Date
    }

    async function fetchNFT() {
        const response = await fetch(`/api/nft/${token_address}/${token_id}`)
        const fetchedNFT: NFTResult = await response.json()
        const metadata = JSON.parse(fetchedNFT.metadata)
        const nft: NFT = {
            token_address: fetchedNFT.token_address,
            token_id: fetchedNFT.token_id,
            name: metadata?.name,
            description: metadata?.description,
            image: metadata?.image,
            owner: fetchedNFT.owner_of,
        }
        return nft
    }

    return (
        <div className="min-h-screen">
            <main className="flex flex-col justify-center max-w-7xl lg:grid lg:grid-cols-3 lg:gap-10 mx-auto">
                <section className="lg:col-span-1 ">
                    {nft && <NFTShowCard nft={nft} />}
                </section>
                <section className="lg:col-span-2 mb-10 mt-5">
                    {nft &&
                        <NFTInfo nft={nft} />
                    }
                </section>
            </main>
        </div>
    )
}

export default NFTPage
