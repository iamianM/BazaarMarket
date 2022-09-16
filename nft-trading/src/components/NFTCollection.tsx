import NFTCard from "./NFTCard"
import { useQuery } from "react-query"

function NFTCollection() {

    const fetchFeaturedCollections = async () => {
        const response = await fetch('/api/collections?include=insights&sort=-insights.trades&filter[network]=ethereum&page[limit]=9')
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