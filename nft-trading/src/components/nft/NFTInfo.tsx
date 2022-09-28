import { useQuery } from "react-query"
import NFTCollectionAvatar from "./NFTCollectionAvatar"
import NFTDetails from "./NFTDetails"
import { useNetwork } from 'wagmi'

function NFTInfo({ owner, description, attributes, collection_address }: { owner: string | any, description: string, attributes: [], collection_address: string }) {


    // const { data } = useQuery('collection', () => fetchCollection())
    // const { chain } = useNetwork()
    // const connectedChain = chain?.name.toLowerCase() || 'ethereum'

    // const fetchCollection = async () => {
    //     const response = await fetch(`/api/collection/${collection_address}?chain=${connectedChain}`)
    //     const data = await response.json()
    //     return data
    // }

    return (
        <div className="mt-28">
            <div className="bg-white flex flex-col space-y-10 bg-opacity-25 backdrop-blur-xl rounded-2xl shadow-md p-5">
                {/* <NFTCollectionAvatar src={collection_image} name={collection_name} address={collection_address} /> */}
                <p className="font-poppins italic text-xl">
                    Description:
                </p>
                <p className="font-poppins mt-5">
                    {description}
                </p>
                {attributes && <p className="font-poppins italic text-xl">
                    Attributes:
                </p>
                }
                <div className="flex flex-wrap space-x-4 space-y-3">
                    {
                        attributes && (
                            (attributes instanceof Array) ?
                                attributes?.map((attribute: any, index: number) => (
                                    <div key={index} className='p-2 rounded-md border-primary border-2 shadow-md'>
                                        <p className="font-poppins text-inherit">{attribute.trait_type}: {attribute.value} </p>
                                    </div>
                                )) :
                                Object?.keys(attributes).map((key, index: number) => (
                                    <div key={index} className='p-2 rounded-md border-primary border-2 shadow-md'>
                                        <p className="font-poppins text-inherit">{key}: {attributes[key]}</p>
                                    </div>
                                ))
                        )
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
