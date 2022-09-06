import React from 'react'
import { HeartIcon, EyeIcon, ShareIcon } from '@heroicons/react/outline'

function NFTShowCard({ src }: { src: string }) {
    return (
        <div className='mt-32'>
            <div className="card w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={src} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Abstract Piece #3467</h2>
                    <div className='flex space-x-3'>
                        <div className='flex space-x-1 items-center'>
                            <HeartIcon className='h-7' />
                            <p className='font-poppins'>29</p>
                        </div>
                        <div className='flex space-x-1 items-center'>
                            <EyeIcon className='h-7' />
                            <p className='font-poppins'>290</p>
                        </div>
                        <div className='flex space-x-1 items-center'>
                            <ShareIcon className='h-7' />
                            <p className='font-poppins'>Share</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTShowCard
