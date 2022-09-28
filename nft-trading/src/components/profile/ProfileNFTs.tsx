import CollectionItem from "../collection/CollectionItem"
import { Item } from "../../../types"
import { useInfiniteQuery, useQuery } from "react-query"
import { Ring } from '@uiball/loaders'
import React, { useEffect, useState } from 'react'
import { useNetwork } from "wagmi"
import TradeModal from "../TradeModal"
import { v4 as uuidv4 } from 'uuid'

function ProfileNFTs({ address }: { address: string | string[] | undefined }) {

    type Items = {
        response: string
        nfts: []
        contract: any
        total: number
    }

    useEffect(() => {
        refetch()
    }, [address])

    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    const [selectedNFT, setSelectedNFT] = useState<any>()

    const addressNo0x = address?.toString().replace('0x', '')
    console.log(addressNo0x)

    const fetchNFTs = async ({ pageParam = "" }) => {
        const res = await fetch(`/api/nfts/wallet?filter[owner]=${connectedChain}:${addressNo0x}&include=token&page[limit]=8&page[cursor]=${pageParam}`)
        const data = await res.json()
        console.log(data)
        return data
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isLoading,
    } = useInfiniteQuery(['nfts', address], (pageParam) => fetchNFTs(pageParam), {
        getNextPageParam: (lastPage) => lastPage.meta?.next_cursor
    })

    return (
        <>
            <TradeModal nft={selectedNFT} />
            {isLoading ?
                <div className="flex justify-center mt-10">
                    <Ring
                        size={40}
                        lineWeight={5}
                        speed={2}
                        color="black"
                    />
                </div>
                :
                <div className="grid grid-cols-2 lg:grid-cols-4 w-5/6 mx-auto mt-10 mb-10 gap-8">
                    {data?.pages?.map((page: any, index: number) => (
                        <React.Fragment key={index}>
                            {page?.included?.map((nft: any, index: number) => (
                                <div className={`${!nft?.attributes?.image_url && "hidden"}`} key={uuidv4()}>
                                    <CollectionItem key={index} owner={address} nft={nft} setSelectedNFT={setSelectedNFT} />
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>}
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
