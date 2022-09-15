
function NFTCollectionAvatar({ src, name }: { src: string, name: string }) {
    return (
        <div className='flex space-x-3 items-center'>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={src} />
                </div>
            </div>
            <p className='font-poppins'>{name}</p>
        </div>
    )
}

export default NFTCollectionAvatar
