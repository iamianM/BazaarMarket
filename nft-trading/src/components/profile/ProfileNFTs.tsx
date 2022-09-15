import CollectionItem from "../collection/CollectionItem"
import { Item } from "../../../types"
import { useInfiniteQuery } from "react-query"
import { Ring } from '@uiball/loaders'
import React from 'react'

function ProfileNFTs({ address }: { address: string | string[] | undefined }) {

    const {
        data: nfts,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
    } = useInfiniteQuery('nfts', (pageParam) => fetchNFTs(pageParam), {
        getNextPageParam: (_, allPages) => allPages.length + 1,
        getPreviousPageParam: (_, allPages) => allPages.length - 1,
    })

    const isDownloading = isLoading || isFetching

    const fetchNFTs = async ({ pageParam = 1 }) => {
        const res = await fetch(`/api/nfts/${address}?chain=ethereum&include=metadata&page_number=${pageParam}&page_size=8`)
        const data = await res.json()
        const nfts = data.nfts
        return nfts
    }

    console.log(nfts)

    return (
        <>
            {isDownloading ?
                <div className="justify-center">
                    <Ring
                        size={40}
                        lineWeight={5}
                        speed={2}
                        color="black"
                    />
                </div>
                :
                <div className="grid grid-cols-2 lg:grid-cols-4 w-5/6 mx-auto mt-10 gap-8">
                    <>
                        {nfts?.pages.map((group: any[], index: number) => (
                            <React.Fragment key={index}>
                                {group?.map((nft: Item) => (
                                    <CollectionItem key={nft.token_id} nft={nft} />
                                ))}
                            </React.Fragment>
                        ))}
                    </>
                    <div className="mt-10 mb-10 flex justify-center">
                        <button className="btn btn-secondary" disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load more</button>
                    </div>
                </div>
            }
        </ >
    )
}

export default ProfileNFTs
