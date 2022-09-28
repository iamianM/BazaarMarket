import { useRouter } from "next/router"
import NFTInfo from "../../../components/nft/NFTInfo"
import NFTShowCard from "../../../components/nft/NFTShowCard"
import { useQuery } from "react-query"
import { Ring } from "@uiball/loaders"
import { useNetwork } from 'wagmi'

function NFTPage() {

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    const router = useRouter()
    const contract_address = router.query.contract_address
    const containsLetter = /[a-zA-Z]/g.test(router.query.token_id as string)
    const token_id = containsLetter ? parseInt("0x" + router.query.token_id as string).toString() : router.query.token_id

    const { data, isLoading, isFetching } = useQuery(['nft', token_id], () => fetchNFT())
    const isDownloading = isLoading || isFetching

    type Data = {
        description: string
        image_preview_icon_url: string
        image_preview_large_url: string
        image_preview_small_url: string
        image_url: string
        image: string
        name: string
        token_id: string
        contractAddress: string
    }

    const queryData: Data = JSON.parse(router.query.data as string ?? "{}")

    type NFTResult = {
        nft: {
            contract_address: string
            token_id: string
            metadata: {
                attributes: []
                description: string
                google_image?: string
                image?: string
                ipfs_image?: string
                name: string
                points: any
            }
            file_url?: string
            cached_file_url?: string
            mint_date: Date
            updated_date: Date
        }
        owner: string | any
        contract: {
            name: string
            metadata: {
                thumbnail_url: string
                cached_thumbnail_url: string
            }
        }
    }

    async function fetchNFT() {
        const response = await fetch(`/api/nft/${contract_address}/${token_id}?chain=${connectedChain}`)
        const data = await response.json()
        const nft: NFTResult = data
        console.log(nft)
        return nft
    }

    const showNFT = queryData &&
        <main className="flex flex-col justify-center max-w-7xl lg:grid lg:grid-cols-3 lg:gap-10 mx-auto mb-10">
            <section className="lg:col-span-1 ">
                <NFTShowCard
                    image={data?.nft?.cached_file_url ?? data?.nft?.file_url ?? queryData.image ?? queryData.image_preview_large_url ?? queryData.image_preview_small_url ?? queryData.image_preview_icon_url ?? queryData.image_url}
                    name={queryData.name ?? data?.nft?.metadata?.name} />
            </section>
            <section className="lg:col-span-2 mb-10 mt-5">
                {data?.nft &&
                    <NFTInfo
                        owner={data?.owner}
                        description={queryData.description}
                        collection_address={data?.nft?.contract_address ?? queryData?.contractAddress}
                        attributes={data?.nft?.metadata?.attributes} />
                }
            </section>
        </main>

    return (
        <div className="min-h-screen">
            {showNFT}
        </div>
    )
}

export default NFTPage
