import React from 'react'
import Link from 'next/link'
import type { Item } from '../../../types'

function CollectionItem({ nft }: { nft: Item }) {

    return (
        <Link href={`/nft/${nft.contract_address}/${nft.token_id}`}>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={nft.cached_file_url || nft.file_url || nft.metadata?.ipfs_image || nft.metadata?.image} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    {/* <p>@Pules</p> */}
                    <h2 className="card-title">{nft.metadata?.name}</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Trade Now</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionItem
