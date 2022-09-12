import NFTCard from "./NFTCard"
import NFTCollection from "./NFTCollection"
import ProfileCollection from "./profile/ProfileCollection"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import NFTCompactCard from "./NFTCompactCard"
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import SearchNFT from "./SearchNFT"

function TradeModal() {

    type NFTResult = {
        token_address: string,
        token_id: string,
        owner_of: string,
        block_number: number,
        block_number_minted: number,
        token_hash: number,
        amount: number,
        contract_type: string,
        name: string,
        symbol: string,
        token_uri: string,
        metadata: string,
        last_token_uri_sync: Date,
        last_metadata_sync: Date,
    }

    type NFT = {
        image: string,
        name: string
    }

    const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } };
    const [nftCollection, setNftCollection] = useState<NFT[]>([])
    const [selectedNFTs, setSelectedNFTs] = useState<NFT[]>([])

    useEffect(() => {
        fetch('https://deep-index.moralis.io/api/v2/0xc839eC222F6EC940980227B39B2ef0715EEF1718/nft?chain=eth&format=decimal', options)
            .then(response => response.json())
            .then(response => {
                const collection = response.result
                let reducedCollection = Array<NFT>()
                collection.forEach((nft: NFTResult) => {
                    const metadata = JSON.parse(nft.metadata)
                    reducedCollection.push({
                        image: metadata?.image ?? "/collection1.png",
                        name: metadata?.name ?? "not found",
                    })
                });
                setNftCollection(reducedCollection)
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <div>
            <label htmlFor="trade-modal" className="btn modal-button">Trade Now</label>
            <input type="checkbox" id="trade-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-7xl bg-white bg-opacity-50 backdrop-blur-xl p-10 scrollbar-hide">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col space-y-6">
                            <p className="font-poppins text-xl font-semibold">Selected NFTs:</p>
                            {/* Left side with NFT to trade */}
                            <div className="carousel p-4 bg-transparent">
                                {selectedNFTs.map((nft, index) => (
                                    <div className="carousel-item p-2 w-32 space-x-4 relative">
                                        <XCircleIcon className="w-8 z-10 top-0 right-0 text-error absolute cursor-pointer" onClick={() => {
                                            for (let i = 0; i < selectedNFTs.length; i++) {
                                                if (selectedNFTs[i]?.name === nft.name && selectedNFTs[i]?.image === nft.image) {
                                                    console.log("selected: " + JSON.stringify(nft.name))
                                                    selectedNFTs.splice(i, 1)
                                                    setSelectedNFTs([...selectedNFTs])
                                                    setNftCollection([...nftCollection, nft])
                                                    break
                                                }
                                            }
                                        }} />
                                        <NFTCompactCard key={index} src={nft.image} name={nft.name} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <SearchNFT />
                            </div>
                            <p className="font-poppins text-xl font-semibold">Your NFTs:</p>
                            <div className="overflow-y-scroll h-2/5">
                                <div className="grid grid-cols-5 gap-3 p-4">
                                    {nftCollection.map((nft, index) => (
                                        <div className="relative" >
                                            <PlusCircleIcon className="w-8 z-10 top-0 right-0 text-success absolute cursor-pointer" onClick={() => {
                                                setSelectedNFTs([...selectedNFTs, nft])
                                                for (let i = 0; i < nftCollection.length; i++) {
                                                    if (nftCollection[i]?.name === nft.name && nftCollection[i]?.image === nft.image) {
                                                        console.log("selected: " + JSON.stringify(nft.name))
                                                        nftCollection.splice(i, 1)
                                                        setNftCollection([...nftCollection])
                                                        break
                                                    }
                                                }
                                            }} />
                                            <NFTCompactCard key={index} src={nft.image} name={nft.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 justify-center">
                            {/* Right side with NFT to obtain */}
                            <div className="flex flex-col items-center space-y-3">
                                <p className="font-poppins text-2xl">NFT to trade:</p>
                                <NFTCard src="/collection1.png" />
                            </div>
                            <div className="modal-action">
                                <label htmlFor="trade-modal" className="btn">Submit Offer</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeModal
