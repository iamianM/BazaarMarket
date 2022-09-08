import React from 'react'
import NFTCollection from '../NFTCollection'

function CollectionItems() {
    return (
        <div className='p-5 mx-auto'>
            <div className="flex flex-col space-y-4 justify-center mt-5 md:flex-row md:items-center md:mt-10 md:space-x-4">
                <input type="text" placeholder="Search an NFT"
                    className="border border-base-200 focus:border-secondary outline-none flex-1 rounded-full p-2" />
                <select className="select select-secondary outline-none">
                    <option disabled selected>Sort By</option>
                    <option>Recently Listed</option>
                    <option>Newest</option>
                    <option>Most Traded</option>
                    <option>Most Likes</option>
                    <option>Most View</option>
                    <option>Rarity</option>
                </select>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto mt-10 gap-6 xl:gap-8'>
                <NFTCollection />
            </div>
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
