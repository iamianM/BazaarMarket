import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import type { Item } from '../../../types'
import CollectionItem from './CollectionItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CollectionItems({ contract_address }: { contract_address: any }) {

    type Items = {
        response: string
        nfts: []
        contract: {}
        total: number
    }

    const fetchNFTs = async ({ pageParam = 1 }) => {
        const res = await fetch(`http://localhost:3000/api/nfts/collection/${contract_address}?chain=ethereum&include=metadata&page_number=${pageParam}&page_size=9`)
        const data = await res.json()
        return data
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        isLoading,
    } = useInfiniteQuery('nfts', ({ pageParam = 1 }) => fetchNFTs(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            const maxPages = lastPage.total / 9
            const nextPage = allPages.length + 1
            return nextPage <= maxPages ? nextPage : undefined
        }
    })

    const [filteredData, setFilteredData] = useState({ search_results: [] })
    const [wordEntered, setWordEntered] = useState("");

    async function searchNFTs(word: string) {
        const response = await fetch(`/api/nfts/search?chain=ethereum&page_size=9&filter_by_contract_address=${contract_address}&text=${word}`)
        const data = await response.json()
        setFilteredData(data)
    }

    const handleFilter = async (event: { target: { value: string } }) => {
        const searchWord = event.target.value.toLowerCase()
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredData({ search_results: [] })
        } else {
            await searchNFTs(searchWord)
        }
    }

    const clearInput = () => {
        setWordEntered("");
        setFilteredData({ search_results: [] })
    }

    return (
        <div className='p-5 mx-auto'>
            <div className="flex flex-col space-y-4 justify-center mt-5 md:flex-row md:items-center md:mt-10 md:space-x-4">
                <input type="text" placeholder="Search an NFT"
                    className="border border-base-200 focus:border-secondary outline-none flex-1 rounded-md px-3 py-2"
                    value={wordEntered}
                    onChange={handleFilter} />
                {/* <select className="select select-secondary outline-none">
                    <option disabled defaultValue="Sort By">Sort By</option>
                    <option>Recently Listed</option>
                    <option>Newest</option>
                    <option>Most Traded</option>
                    <option>Most Likes</option>
                    <option>Most View</option>
                    <option>Rarity</option>
                </select> */}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto mt-10 gap-6 xl:gap-8'>
                {
                    isLoading || isFetching && (
                        <Skeleton count={10} />
                    )
                }
                {
                    wordEntered.length > 0 && (
                        filteredData?.search_results?.length > 0 ? (
                            filteredData?.search_results?.map((nft: Item) => (
                                <CollectionItem key={nft.token_id} nft={nft} />
                            ))
                        ) : (
                            <div className='text-center text-2xl font-bold text-gray-500'>
                                No NFTs found
                            </div>
                        ))
                }
                {
                    wordEntered.length === 0 && (
                        data?.pages.map((page: Items, index: number) => (
                            <React.Fragment key={index}>
                                {page?.nfts?.map((nft: Item) => (
                                    <CollectionItem key={nft.token_id} nft={nft} />
                                ))}
                            </React.Fragment>
                        ))
                    )}
            </div>
            <div className="mt-10 flex justify-center">
                <button className="btn btn-secondary" disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </button>
            </div>
        </div>
    )
}

export default CollectionItems
