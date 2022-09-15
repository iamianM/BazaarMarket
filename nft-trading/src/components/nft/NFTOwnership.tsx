import { DocumentDuplicateIcon } from '@heroicons/react/outline'
import makeBlockie from 'ethereum-blockies-base64';

function NFTOwnership({ owner }: { owner: string | any }) {

    return (
        <div className="flex space-x-8 mt-10 items-center">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={makeBlockie(owner)} />
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <p className='font-poppins'>Address</p>
                <div className='flex space-x-1 items-center'>
                    <p>{owner}</p>
                    <DocumentDuplicateIcon className='h-6 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default NFTOwnership
