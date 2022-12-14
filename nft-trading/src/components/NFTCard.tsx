import Link from 'next/link'

function NFTCard({ content, isCollection }: { content: any, isCollection?: boolean }) {

    const collectionAddress = content?.address?.startsWith("0x") ? content?.address : `0x${content?.address}`
    console.log(content)
    return (
        <Link href={{ pathname: `/collection/${collectionAddress}`, query: { data: JSON.stringify(content) } }}>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={content?.image_url ?? content?.image} className="rounded-xl object-cover w-4/5 " />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{content?.name}</h2>
                </div>
            </div>
        </Link>
    )
}

export default NFTCard