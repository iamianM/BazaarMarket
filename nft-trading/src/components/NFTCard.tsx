import Link from 'next/link'
import type { FeaturedCollection } from '../../types'

function NFTCard({ content }: { content: FeaturedCollection }) {

    return (
        <Link href={`/collection/${content.token_address}`}>
            <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                <figure className="px-10 pt-10">
                    <img src={content.image} className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <p>@Pules</p>
                    <h2 className="card-title">{content.name}</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary">Trade Now</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NFTCard