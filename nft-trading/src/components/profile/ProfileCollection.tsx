import type { Collection } from '../../../types'

function ProfileCollection({ collection }: { collection: Collection }) {
    return (
        <div className="flex flex-col">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    {collection.image ? <img src={collection.image} /> : <p>{collection.symbol}</p>}
                </div>
            </div>
            <p className="text-center w-24 font-poppins truncate">{collection.name}</p>
        </div>
    )
}

export default ProfileCollection