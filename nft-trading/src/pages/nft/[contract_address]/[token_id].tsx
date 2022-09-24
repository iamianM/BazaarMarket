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
    const token_id = router.query.token_id

    const { data, isLoading, isFetching } = useQuery('nft', () => fetchNFT())
    const isDownloading = isLoading || isFetching

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

    return (
        <div className="min-h-screen">
            <main className="flex flex-col justify-center max-w-7xl lg:grid lg:grid-cols-3 lg:gap-10 mx-auto">
                <section className="lg:col-span-1 ">
                    {data?.nft && <NFTShowCard
                        image={data?.nft?.cached_file_url ||
                            data?.nft?.file_url ||
                            data?.nft?.metadata?.google_image ||
                            data?.nft?.metadata?.image ||
                            data?.nft?.metadata?.ipfs_image}
                        name={data?.nft?.metadata?.name} />}
                </section>
                <section className="lg:col-span-2 mb-10 mt-5">
                    {data?.nft &&
                        <NFTInfo
                            owner={data?.owner ?? data?.owner?.address}
                            description={data?.nft?.metadata?.description}
                            collection_image={data?.contract?.metadata?.cached_thumbnail_url ?? data?.contract?.metadata?.cached_thumbnail_url}
                            collection_name={data?.contract?.name}
                            attributes={data?.nft?.metadata?.attributes}
                            collection_address={data?.nft?.contract_address} />
                    }
                </section>
            </main>
        </div>
    )
}

export default NFTPage
