import Link from 'next/link'
import React from 'react'

function CollectionCard({ banner, logo, name, address }: { banner: string, logo: string, name: string, address: string }) {
  return (
    <Link href={`/collection/0x${address}`}>
      <div className="bg-base-100 rounded-xl shadow-xl cursor-pointer">
        <div className='relative h-3/4'>
          <img className='w-full h-full rounded-t-xl object-cover' src={banner} alt="banner" />
          <div className='flex space-x-10'>
            <img className='absolute -bottom-12 left-12  rounded-xl w-16 h-16 object-cover ring ring-secondary ring-offset-base-100 ring-offset-4' src={logo} alt="logo" />
            <p className='font-poppins text-xl font-semibold uppercase text-center mt-16'>{name}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard