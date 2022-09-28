import NFTCard from "./NFTCard"
import { useQuery } from "react-query"
import { useNetwork } from "wagmi"
import DiffemonCollection from "../../data/diffemonCollection.json"
import Link from "next/link"
import featuredCollectionsETH from "../../data/featuredCollectionsETH.json"
import featuredCollectionsMATIC from "../../data/featuredCollectionsMATIC.json"

function NFTCollection() {

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    const fetchFeaturedCollections = async () => {
        const response = await fetch(`/api/collections?include=insights&sort=-insights_trends.volume_change_percent&filter[network]=${connectedChain}&page[limit]=8`)
        const data = await response.json()
        return data
    }

    const { data: featuredCollections } = useQuery('featuredCollections', () => fetchFeaturedCollections())

    return (
        <>
            <Link href="/collection/diffemon">
                <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                    <figure className="px-10 pt-10">
                        <img src="/diffemon/corgichu.png" className="rounded-xl object-cover w-4/5 " />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{DiffemonCollection.attributes.name}</h2>
                    </div>
                </div>
            </Link>
            {
                connectedChain === 'ethereum' &&
                featuredCollectionsETH?.data?.map((collection: any, index: number) => (
                    <NFTCard key={index} content={collection.attributes} isCollection={true} />
                ))}
            {
                connectedChain === 'polygon' &&
                featuredCollectionsMATIC?.data?.map((collection: any, index: number) => (
                    <NFTCard key={index} content={collection.attributes} isCollection={true} />
                ))}
            {
                connectedChain === 'rinkeby' &&
                featuredCollections?.data?.map((collection: any, index: number) => (
                    <NFTCard key={index} content={collection.attributes} isCollection={true} />
                ))}
        </>
    )
}

export default NFTCollection