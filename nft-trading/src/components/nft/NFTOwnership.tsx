import { DocumentDuplicateIcon } from '@heroicons/react/outline'

function NFTOwnership() {
    return (
        <div className="flex justify-between mt-10 items-center">
            <div className='flex space-x-3 items-center'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="/photo2.png" />
                    </div>
                </div>
                <div className="flex flex-col space-y-1">
                    <p>Owner</p>
                    <p className='font-poppins'>Abstract Creator</p>
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <p className='font-poppins'>Address</p>
                <div className='flex space-x-1 items-center'>
                    <p>cro1qj75rh6554neun3s7....</p>
                    <DocumentDuplicateIcon className='h-6 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default NFTOwnership
