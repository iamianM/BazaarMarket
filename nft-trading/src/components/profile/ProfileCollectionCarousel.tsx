import { useQuery } from "react-query";
import { Ring } from '@uiball/loaders'
import Link from "next/link";
import { useNetwork } from "wagmi";
function ProfileCollectionCarousel({ address }: { address: string | string[] | undefined }) {

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    type CollectionCarouselItems = {
        contracts: [
            {
                name: string,
                metadata: {
                    thumbnail_url: string,
                    cached_thumbnail_url: string,
                }
                address: string
            },
        ]
    }

    const { data: collections, isLoading, isFetching } = useQuery('collections', () => fetchCollections(), {
        retry: 10,
        retryDelay: attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
    })

    const isDownloading = isLoading || isFetching

    async function fetchCollections() {
        const response = await fetch(`/api/profile/collections/${address}?chain=${connectedChain}&type=owns_contract_nfts`)
        const fetchedCollections: CollectionCarouselItems = await response.json()
        return fetchedCollections
    }

    return (
        <div className="mt-4 lg:mt-20">
            <h1 className="font-bold text-5xl uppercase text-center font-poppins">Collections</h1>
            <div className="carousel carousel-center w-5/6 mt-10 mx-auto p-4 space-x-8 bg-transparent ">
                {isDownloading ?
                    <div className="justify-center">
                        <Ring
                            size={40}
                            lineWeight={5}
                            speed={2}
                            color="black"
                        />
                    </div> :
                    collections?.contracts?.map((collection, index) => (
                        <Link href={`/collection/${collection.address}`} key={index}>
                            <div className="carousel-item cursor-pointer" key={index}>
                                <div className="flex flex-col">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={collection?.metadata?.cached_thumbnail_url ?? collection?.metadata?.thumbnail_url} alt="carousel-item" />
                                        </div>
                                    </div>
                                    <p className="text-center w-24 font-poppins truncate">{collection?.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default ProfileCollectionCarousel
