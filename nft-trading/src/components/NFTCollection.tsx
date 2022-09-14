import NFTCard from "./NFTCard"
import { collections } from "../../data/featuredCollections.json"
import type { FeaturedCollection } from '../../types'

function NFTCollection() {

    const data: FeaturedCollection[] = collections

    return (
        <>
            {data?.map((collection, index) => (
                <NFTCard key={index} content={collection} />
            ))}
        </>
    )
}

export default NFTCollection