import Link from 'next/link'

function NFTCard({ src }: { src: string }) {
    return (
        <Link href={'/collection/name'}>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={src} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p>@Pules</p>
                    <h2 className="card-title">An Awesome NFT</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Trade Now</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NFTCard