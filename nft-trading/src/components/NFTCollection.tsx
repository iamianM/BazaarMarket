import NFTCard from "./NFTCard"
import { useQuery } from "react-query"
import { useNetwork } from "wagmi"

function NFTCollection() {

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    const fetchFeaturedCollections = async () => {
        const response = await fetch(`/api/collections?include=insights&sort=-insights.trades&filter[network]=${connectedChain}&page[limit]=9`)
        const data = await response.json()
        return data
    }

    const { data: featuredCollections } = useQuery('featuredCollections', () => fetchFeaturedCollections())

    return (
        <>
            {featuredCollections?.data?.map((collection: any, index: number) => (
                <NFTCard key={index} content={collection.attributes} />
            ))}
        </>
    )
}

export default NFTCollection