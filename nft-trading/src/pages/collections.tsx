import React from 'react'
import { useInfiniteQuery } from 'react-query'
import CollectionCard from '../components/collections/CollectionCard'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNetwork } from 'wagmi'
import Diffemon from "../../data/diffemonCollection.json"
import DiffemonCollectionCard from '../components/collections/DiffemonCollectionCard'

function CollectionsPage() {

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'
    const [filteredData, setFilteredData] = useState({ data: [] })
    const [wordEntered, setWordEntered] = useState("");

    async function searchCollections(word: string) {
        const response = await fetch(`/api/collections/search?filter[name]=${word}&filter[network]=${connectedChain}&page[limit]=16`)
        const data = await response.json()
        setFilteredData(data)
    }

    const fetchCollections = async ({ pageParam = "" }) => {
        const response = await fetch(`/api/collections?include=insights&sort=-insights.trades&filter[network]=${connectedChain}&page[limit]=8&page[cursor]=${pageParam}`)
        const data = await response.json()
        return data
    }

    const handleFilter = async (event: { target: { value: string } }) => {
        const searchWord = event.target.value.toLowerCase()
        setWordEntered(searchWord);
        if (searchWord === "") {
            setFilteredData({ data: [] })
        } else if (searchWord.length > 4) {
            await searchCollections(searchWord)
        }
    }

    const clearInput = () => {
        setWordEntered("");
        setFilteredData({ data: [] })
    }


    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isFetching, isLoading } = useInfiniteQuery('collections', (pageParam) => fetchCollections(pageParam), {
        getNextPageParam: (lastPage, allPages) => lastPage.meta?.next_cursor,
    })

    return (
        <div className='min-h-screen'>
            <div className='flex flex-col space-y-12 w-5/6 mx-auto'>
                {/* Title */}
                <p className='text-5xl font-semibold font-poppins pt-48'>Explore collections</p>
                {/* Search bar */}
                <input type="text" className="p-6 pl-8 h-8 rounded-xl bg-base-100 border shadow-lg outline-none"
                    placeholder='Search a collection'
                    value={wordEntered}
                    onChange={handleFilter} />
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pb-10'>
                    <DiffemonCollectionCard attributes={Diffemon.attributes} />
                    {
                        wordEntered.length > 0 ? (
                            filteredData?.data?.map((collection: any) => (
                                <CollectionCard key={collection.id} attributes={collection.attributes} />
                            ))
                        ) : (
                            data?.pages?.map((page, index) => (
                                <React.Fragment key={index}>
                                    {page?.data?.map((collection: any) => (
                                        <CollectionCard key={collection.id} attributes={collection.attributes} />
                                    ))}
                                </React.Fragment>
                            )))
                    }
                </div>
                {
                    wordEntered.length === 0 && (
                        <div className="flex justify-center pb-10">
                            <button className="btn btn-secondary" disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                                {isFetchingNextPage
                                    ? 'Loading more...'
                                    : hasNextPage
                                        ? 'Load More'
                                        : 'Nothing more to load'}
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default CollectionsPage