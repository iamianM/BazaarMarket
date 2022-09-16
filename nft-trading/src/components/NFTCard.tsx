import Link from 'next/link'

function NFTCard({ content }: { content: any }) {

    return (
        <Link href={`/collection/0x${content?.address}`}>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={content?.image_url} className="rounded-xl object-cover w-4/5 " />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{content?.name}</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Trade Now</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NFTCard