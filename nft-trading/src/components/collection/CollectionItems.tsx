import React from 'react'
import { useInfiniteQuery } from 'react-query'
import type { Item } from '../../../types'
import CollectionItem from './CollectionItem'

function CollectionItems({ contract_address }: { contract_address: any }) {

    const {
        data: nfts,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery('nfts', (pageParam) => fetchNFTs(pageParam), {
        getNextPageParam: (_, allPages) => allPages.length + 1,
        getPreviousPageParam: (_, allPages) => allPages.length - 1,
    })

    const fetchNFTs = async ({ pageParam = 1 }) => {
        const res = await fetch(`/api/nfts/${contract_address}?chain=ethereum&include=metadata&page_number=${pageParam}&page_size=9`)
        const data = await res.json()
        const nfts = data.nfts
        return nfts
    }

    return (
        <div className='p-5 mx-auto'>
            <div className="flex flex-col space-y-4 justify-center mt-5 md:flex-row md:items-center md:mt-10 md:space-x-4">
                <input type="text" placeholder="Search an NFT"
                    className="border border-base-200 focus:border-secondary outline-none flex-1 rounded-full p-2" />
                <select className="select select-secondary outline-none">
                    <option disabled defaultValue="Sort By">Sort By</option>
                    <option>Recently Listed</option>
                    <option>Newest</option>
                    <option>Most Traded</option>
                    <option>Most Likes</option>
                    <option>Most View</option>
                    <option>Rarity</option>
                </select>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto mt-10 gap-6 xl:gap-8'>
                {nfts?.pages.map((group: any[], index: number) => (
                    <React.Fragment key={index}>
                        {group?.map((nft: Item) => (
                            <CollectionItem key={nft.token_id} nft={nft} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <button className="btn btn-secondary" disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load more</button>
            </div>
        </div>
    )
}

export default CollectionItems
