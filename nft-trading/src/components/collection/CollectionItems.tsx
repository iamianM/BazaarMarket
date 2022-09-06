import React from 'react'
import NFTCollection from '../NFTCollection'

function CollectionItems() {
    return (
        <div>
            <div className="flex mt-10 space-x-4">
                <input type="text" placeholder="Search an NFT" className="border border-base-200 focus:border-secondary outline-none flex-1 rounded-full p-2" />
                <select className="select select-secondary w-full outline-none max-w-xs">
                    <option disabled selected>Sort By</option>
                    <option>Recently Listed</option>
                    <option>Newest</option>
                    <option>Most Traded</option>
                    <option>Most Likes</option>
                    <option>Most View</option>
                    <option>Rarity</option>
                </select>
            </div>
            <NFTCollection />
            <div className="mt-10 flex justify-center">
                <div className="btn-group">
                    <button className="btn btn-lg">1</button>
                    <button className="btn btn-lg btn-active">2</button>
                    <button className="btn btn-lg">3</button>
                    <button className="btn btn-lg">4</button>
                </div>
            </div>
        </div>
    )
}

export default CollectionItems
