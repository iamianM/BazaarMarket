import { DocumentDuplicateIcon } from '@heroicons/react/outline'
import makeBlockie from 'ethereum-blockies-base64';
import Link from 'next/link';

function NFTOwnership({ owner }: { owner: string | any }) {

    const seed = owner?.length > 10 ? owner : "0xCd8248589E085446aAbD028E97393a20A1b6C48d"
    return (
        <div className="flex space-x-8 mt-10 items-center">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={makeBlockie(seed)} />
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <p className='font-poppins'>Address:</p>
                {owner ? <div className='flex space-x-1 items-center'>
                    <Link href={`/profile/${owner}`}>
                        <p className='cursor-pointer font-poppins hover:underline hover:text-info'>{owner}</p></Link>
                    <DocumentDuplicateIcon className='h-6 cursor-pointer' />
                </div> :
                    <p className='font-poppins'>null</p>}
            </div>
        </div>
    )
}

export default NFTOwnership
