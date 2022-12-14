import React from 'react'
import CollectionChart from './CollectionChart'
import CollectionTrades from './CollectionTrades'

function CollectionActivity() {
    return (
        <div className='p-5 mx-auto'>
            <div className='flex flex-col'>
                <div className='mt-10 w-full flex justify-center'>
                    {/* <CollectionChart /> */}
                </div>
                <div className='mt-10 p-4'>
                    <CollectionTrades />
                </div>
            </div>
        </div>
    )
}

export default CollectionActivity
