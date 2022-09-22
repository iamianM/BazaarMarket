import NFTCollectionAvatar from "./NFTCollectionAvatar"
import NFTDetails from "./NFTDetails"

function NFTInfo({ owner, description, collection_image, collection_name, attributes, collection_address }: { owner: string | any, description: string, collection_image: string, collection_name: string, attributes: [], collection_address: string }) {
    return (
        <div className="mt-28">
            <div className="bg-white flex flex-col space-y-10 bg-opacity-25 backdrop-blur-xl rounded-2xl shadow-md p-5">
                <NFTCollectionAvatar src={collection_image} name={collection_name} address={collection_address} />
                <p className="font-poppins">
                    {description}
                </p>
                {attributes && <p className="font-poppins italic text-xl">
                    Attributes:
                </p>
                }
                <div className="flex flex-wrap space-x-4 space-y-3">
                    {
                        attributes && attributes.map((attribute: any, index: number) => (
                            <div key={index} className='p-2 rounded-md border-primary border-2 shadow-md'>
                                <p className="font-poppins text-inherit">{attribute.trait_type}: {attribute.value} </p>
                            </div>
                        ))
                    }
                </div>
                <div className="mx-12 mt-5">
                    <NFTDetails owner={owner} />
                </div>
            </div>
        </div>
    )
}

export default NFTInfo
