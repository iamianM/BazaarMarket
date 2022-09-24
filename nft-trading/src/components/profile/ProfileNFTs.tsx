import CollectionItem from "../collection/CollectionItem"
import { Item } from "../../../types"
import { useInfiniteQuery } from "react-query"
import { Ring } from '@uiball/loaders'
import React, { useState } from 'react'
import { useNetwork } from "wagmi"
import TradeModal from "../TradeModal"

function ProfileNFTs({ address }: { address: string | string[] | undefined }) {

    type Items = {
        response: string
        nfts: []
        contract: any
        total: number
    }

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    const [selectedNFT, setSelectedNFT] = useState<Item | null | undefined>()

    const fetchNFTs = async ({ pageParam = "" }) => {
        const res = await fetch(`/api/nfts/wallet/${address}?chain=${connectedChain}&include=metadata&continuation=${pageParam}&page_size=8`)
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
        refetchOnMount: 'always'
    })

    return (
        <>
            <TradeModal nft={selectedNFT} />
            <div className="grid grid-cols-2 lg:grid-cols-4 w-5/6 mx-auto mt-10 mb-10 gap-8">
                {data?.pages?.map((page: Items, index: number) => (
                    <React.Fragment key={index}>
                        {page?.nfts?.map((nft: Item, index: number) => (
                            <CollectionItem key={index} owner={address} nft={nft} setSelectedNFT={setSelectedNFT} />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-10 mb-10 flex justify-center">
                <button className="btn btn-secondary" disabled={!hasNextPage || isFetchingNextPage} onClick={() => fetchNextPage()}>
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </button>
            </div>
        </>
    )
}

export default ProfileNFTs
