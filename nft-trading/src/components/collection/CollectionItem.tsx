import React from 'react'
import Link from 'next/link'
import type { Item } from '../../../types'
import { useAccount } from 'wagmi'

function CollectionItem({ nft, setSelectedNFT, owner }: { nft: Item, setSelectedNFT: any, owner: string | string[] | undefined }) {

    const { address } = useAccount()
    const src = nft?.file_url || nft?.cached_file_url || nft?.metadata?.ipfs_image || nft?.metadata?.image
    return (
        <>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <Link href={`/nft/${nft.contract_address}/${nft.token_id}`}>
                    <figure className="px-10 pt-10">
                        <img src={src}
                            className="rounded-xl object-cover" />
                    </figure>
                </Link>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{nft.metadata?.name ?? nft.name}</h2>
                    {address !== owner &&
                        <div className="card-actions">
                            <label htmlFor="trade-modal" className="btn btn-primary modal-button" onClick={() => {
                                nft.owner = owner
                                setSelectedNFT(nft)
                            }}>Trade Now</label>
                        </div>}
                </div>
            </div>
        </>
    )
}

export default CollectionItem
