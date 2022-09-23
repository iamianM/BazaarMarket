import React from 'react'
import { UserCircleIcon, StarIcon, PhotographIcon } from '@heroicons/react/outline'
import { useAccount } from 'wagmi'
import Link from 'next/link'
function UserMenu() {

    const { address } = useAccount()

    return (
        <div className="hidden absolute peer-hover:flex hover:flex
                                        w-[200px] top-16 rounded-2xl
                                        flex-col bg-white bg-opacity-50 backdrop-blur-xl drop-shadow-lg">
            <Link href={`/profile/${address}`}>
                <div className="flex items-center space-x-2 px-5 py-3  hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl rounded-2xl cursor-pointer">
                    <UserCircleIcon className="h-6 w-6" />
                    <a className="font-poppins" href="#">Profile</a>
                </div>
            </Link>
            {/* <div className="flex items-center space-x-2 px-5 py-3 hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl rounded-2xl cursor-pointer">
                <StarIcon className="h-6 w-6" />
                <a className="font-poppins" href="#">Favorites</a>
            </div>
            <div className="flex items-center space-x-2 px-5 py-3 rounded-2xl hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl cursor-pointer">
                <PhotographIcon className="h-6 w-6" />
                <a className="font-poppins " href="#">My Collection</a>
            </div> */}
            <Link href={"/my-trades"}>
                <div className="flex items-center space-x-2 px-5 py-3 rounded-2xl hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    <a className="font-poppins" href="#">My Trades</a>
                </div>
            </Link>
        </div>
    )
}

export default UserMenu