import NFTCreatorAvatar from "./NFTCreatorAvatar"
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/solid'
function NFTHistoryRow() {
    return (
        <div className="flex items-center justify-between">
            <NFTCreatorAvatar nft="Imaginary ones #3467" />
            <div className='flex items-center space-x-2'>
                <div className="mask mask-squircle w-12 h-12">
                    <img src="/imaginary_ones.jpeg" alt="Avatar Tailwind CSS Component" />
                </div>
                <div className="flex flex-col">
                    <ArrowRightIcon className='h-6' />
                    <ArrowLeftIcon className='h-6' />
                </div>
                <div className="mask mask-squircle w-12 h-12">
                    <img src="/collection1.png" alt="Avatar Tailwind CSS Component" />
                </div>
            </div>
            <button className='w-fit h-fit px-2 border-primary border-2 text-primary font-poppins rounded-full'>Details</button>
        </div>
    )
}

export default NFTHistoryRow
