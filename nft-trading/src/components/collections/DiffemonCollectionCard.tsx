import Link from 'next/link'
import React from 'react'

function DiffemonCollectionCard({ attributes }: { attributes: any }) {

    const collectionAddress = attributes?.address.startsWith("0x") ? attributes?.address : `0x${attributes?.address}`

    return (
        <Link href="/collection/diffemon">
            <div className="bg-base-100 rounded-xl shadow-xl cursor-pointer">
                <div className='relative h-3/4'>
                    <div className='flex space-x-10'>
                        <img className='absolute -bottom-12 left-12  rounded-xl w-16 h-16 object-cover ring ring-secondary ring-offset-base-100 ring-offset-4' src={attributes?.image_preview_icon_url} alt="logo" />
                        <p className='font-poppins text-xl font-semibold uppercase text-center mt-16'>{attributes?.name}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DiffemonCollectionCard