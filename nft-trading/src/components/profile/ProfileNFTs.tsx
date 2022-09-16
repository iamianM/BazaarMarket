import CollectionItem from "../collection/CollectionItem"
import { Item } from "../../../types"
import { useInfiniteQuery } from "react-query"
import { Ring } from '@uiball/loaders'
import React from 'react'



function ProfileNFTs({ address }: { address: string | string[] | undefined }) {

    type Items = {
        response: string
        nfts: []
        contract: {}
        total: number
    }

    const fetchNFTs = async ({ pageParam = "" }) => {
        const res = await fetch(`/api/nfts/wallet/${address}?chain=ethereum&include=metadata&continuation=${pageParam}&page_size=8`)
        const data = await res.json()
        console.log(data)
        return data
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery('nfts', (pageParam) => fetchNFTs(pageParam), {
        getNextPageParam: (lastPage, allPages) => lastPage.continuation,
    })

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 w-5/6 mx-auto mt-10 gap-8">
            <>
                {data?.pages.map((page: Items, index: number) => (
                    <React.Fragment key={index}>
                        {page?.nfts?.map((nft: Item) => (
                            <CollectionItem key={nft.token_id} nft={nft} />
                        ))}
                    </React.Fragment>
                ))}
            </>
            <div className="mt-10 mb-10 flex justify-center">
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

export default ProfileNFTs
