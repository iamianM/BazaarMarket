import Link from "next/link"

function NFTCollectionAvatar({ src, name, address }: { src: string, name: string, address: string }) {
    return (
        <div className='flex space-x-3 items-center'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={src} />
                </div>
            </div>
            <Link href={`/collection/${address}`}><p className='cursor-pointer hover:underline hover:text-info font-poppins'>{name}</p></Link>
        </div>
    )
}

export default NFTCollectionAvatar
