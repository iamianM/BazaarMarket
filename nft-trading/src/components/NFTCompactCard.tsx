import React from 'react'

type Props = {
    src: string,
    name: string
}

function NFTCompactCard({ src, name }: Props) {
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div className='flex-col space-y-3'>
                <figure><img src={src} alt="image" /></figure>
                <p className='p-2 font-poppins truncate text-center'>{name}</p>
            </div>
        </div>
    )
}

export default NFTCompactCard
