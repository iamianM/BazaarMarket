import React from 'react'

function NFTCreatorAvatar({ nft }: { nft?: string }) {
    return (
        <div className='flex space-x-3 items-center'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src="/photo2.png" />
                </div>
            </div>
            <div>
                <p className='font-poppins'>Abstract Creator</p>
                {nft && <p>{`Traded for ${nft}`}</p>}
            </div>

        </div>
    )
}

export default NFTCreatorAvatar
