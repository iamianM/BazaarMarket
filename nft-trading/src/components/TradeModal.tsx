import { useEffect, useState } from "react"
import NFTCompactCard from "./NFTCompactCard"
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useQuery } from "react-query"
import { useAccount, useNetwork } from "wagmi"
import type { Item } from '../../types'
import NFTTraderSDK from "@nfttrader-io/sdk-js"
import { ethers } from "ethers"
import { toast } from 'react-hot-toast'
import { trpc } from '../utils/trpc';
import { v4 as uuidv4 } from 'uuid';
import { erc721ABI } from 'wagmi'
import { NftTraderRinkeby } from "../../constants"

function TradeModal({ nft }: { nft: Item | null | undefined }) {

    const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const [filteredData, setFilteredData] = useState({ data: [] })
    const [wordEntered, setWordEntered] = useState("");
    const [disable, setDisable] = useState(false)
    const createNFTMakerMutation = trpc.useMutation('nft-maker.create-nft')
    const createNFTTakerMutation = trpc.useMutation('nft-taker.create-nft')
    const updateSwapMutation = trpc.useMutation('swap.insert-swapId')
    const createSwapMutation = trpc.useMutation('swap.create-swap')
    const { refetch: refetchSwapRequestId } = trpc.useQuery(["swap.get-latest-swap"], {
        enabled: false,
    })

    useEffect(() => {
        const loadProviders = async () => {
            if (typeof window !== 'undefined') {
                const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider((window as any).ethereum)
                await provider.send('eth_requestAccounts', [])
                setEthersProvider(provider)
            }
        }

        loadProviders()
    }, [])

    const { address } = useAccount()
    const { chain } = useNetwork()
    const connectedChain = chain?.name.toLowerCase() || 'ethereum'
    const signer = ethersProvider?.getSigner(address)

    const approveAllSelectedNFTs = () => {
        selectedNFTs.forEach(async (nft) => {
            console.log("Contract address:", nft.contract_address.trim())
            const nftContract = new ethers.Contract(nft.contract_address, erc721ABI, signer)
            console.log(NftTraderRinkeby)
            await nftContract.setApprovalForAll(NftTraderRinkeby, true)
        });
    }

    const sdk = new NFTTraderSDK({
        ethers: ethers, //you need to provide the instance of ethers js library
        web3Provider: ethersProvider, //or an instance of ethers.providers.Web3Provider
        network: connectedChain.toUpperCase(), //example: 'ETHEREUM', 'RINKEBY', 'POLYGON', 'MUMBAI', 'XDAI'
    })

    const updateSwap = (id: string, swapId: string) => {
        updateSwapMutation.mutate({ id, swapId })
    }

    const createNFT = async (
        type: string,
        tokenId: string,
        contractAddress: string,
        name: string,
        image: string,
        swapRequestId: string,
    ) => {
        if (type === 'maker') {
            createNFTMakerMutation.mutate({ tokenId, contractAddress, name, image, swapRequestId })
        } else if (type === 'taker') {
            createNFTTakerMutation.mutate({ tokenId, contractAddress, name, image, swapRequestId })
        }
    }

    const createNFTs = (swapRequestId: string) => {
        for (let i = 0; i < selectedNFTs.length; i++) {
            const src = selectedNFTs[i]?.image || selectedNFTs[i]?.file_url || selectedNFTs[i]?.cached_file_url || selectedNFTs[i]?.metadata?.image || selectedNFTs[i]?.metadata?.ipfs_image
            createNFT("maker", selectedNFTs[i]?.token_id ?? "0", selectedNFTs[i]?.contract_address ?? "0", selectedNFTs[i]?.name ?? "", src ?? "", swapRequestId)
        }
        const src = nft?.image || nft?.file_url || nft?.cached_file_url || nft?.metadata?.image || nft?.metadata?.ipfs_image
        createNFT("taker", nft?.token_id ?? "0", nft?.contract_address ?? "0", nft?.name ?? "", src ?? "", swapRequestId)
    }

    const buildTrade = async () => {
        const selectedNFTsArray = new sdk.AssetsArray()
        for (let i = 0; i < selectedNFTs.length; i++) {
            selectedNFTsArray.addERC721Asset(selectedNFTs[i]?.contract_address, selectedNFTs[i]?.token_id)
        }
        const nftToTrade = new sdk.AssetsArray()
        nftToTrade.addERC721Asset(nft?.contract_address, nft?.token_id)
        await submitTrade(selectedNFTsArray.getAssetsArray(), nftToTrade.getAssetsArray())
    }

    const submitTrade = async (nftMaker: [any], nftTaker: [any]) => {
        setDisable(true)
        sdk.on("createSwapTransactionError", ({ error, typeError }: { error: any, typeError: any }) => {
            console.log({ error, typeError })
            toast.error("Error creating trade")
            //typeError value can be: createSwapIntentError or waitError. The first one means the error is occured during the process creation of the transaction. The second one means the error is occured during the mining process of the transaction.
        })
        sdk.on("createSwapTransactionCreated", async ({ tx }: { tx: any }) => {
            const addressMaker = address as string
            const addressTaker = nft?.owner as string
            await createSwapMutation.mutateAsync({ addressMaker, addressTaker }, {
                onSuccess: (data) => {
                    createNFTs(data.id as string)
                },
            })
            // const txHash = tx.hash
            toast.success("Trade created, it will be mined soon")
            //tx object is an instance of the class TransactionResponse. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse]
        })
        sdk.on("createSwapTransactionMined", async ({ receipt }: { receipt: any }) => {
            //receipt object is an instance of the class TransactionReceipt. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt]
            const events = receipt.events
            const event = events[0]
            const { _swapId } = event.args
            const res = await refetchSwapRequestId()
            updateSwap(res?.data?.id as string, _swapId._hex)
            toast.success("Trade mined")
            //do whatever you want
            setDisable(false)
        })
        await sdk.createSwap({
            ethMaker: "100000000000", //amount in wei placed by the creator of the swap (mandatory)
            taker: nft?.owner, //address of the taker (counterparty) of the swap. If you provide the value '0x0000000000000000000000000000000000000000' the swap can be closed by everyone (mandatory)
            ethTaker: "100000000000", //amount in wei placed by the taker of the swap (mandatory)
            swapEnd: 1, //number of days of validity of the swap. If not specified the value will be zero. Zero value means no time limit. (optional)
            assetsMaker: nftMaker, //Array of ERC721/1155/20 tokens placed by the creator of the swap. The default value is an empty array. The SDK provides utility methods to build this array. (optional)
            assetsTaker: nftTaker, //Array of ERC721/1155/20 tokens placed by the taker (counterparty) of the swap. The default value is an empty array. The SDK provides utility methods to build this array. (optional)
        })
        sdk.off('createSwapTransactionCreated') //remove all the listener
        sdk.off('createSwapTransactionMined') //remove all the listener
        sdk.off('createSwapTransactionError') //remove all the listener
    }

    // const handleFilter = async (event: { target: { value: string } }) => {
    //     const searchWord = event.target.value.toLowerCase()
    //     setWordEntered(searchWord);
    //     if (searchWord === "") {
    //         setFilteredData({ data: [] })
    //     } else (searchWord.length > 4) {
    //         await searchCollections(searchWord)
    //     }
    // }

    const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } };
    const [nftCollection, setNftCollection] = useState<Item[]>([])
    const [selectedNFTs, setSelectedNFTs] = useState<Item[]>([])



    const { data, isLoading } = useQuery('trading-nfts', () => fetchNFTs(), {
        select: (data) => data?.nfts?.map((nft: Item) => ({
            image: nft?.cached_file_url || nft?.file_url || nft?.metadata?.image || nft?.metadata?.ipfs_image,
            name: nft?.metadata?.name,
            contract_address: nft?.contract_address,
            token_id: nft?.token_id,
            owner: nft?.owner,
        }
        )),
        onSuccess: (data) => {
            setNftCollection(data)
        }
    })

    const fetchNFTs = async () => {
        const response = await fetch(`/api/nfts/wallet/${address}?chain=${connectedChain}&include=metadata`, options)
        const data = await response.json()
        return data
    }

    return (
        <div>
            <input type="checkbox" id="trade-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-7xl bg-white bg-opacity-50 backdrop-blur-xl p-10 scrollbar-hide">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 flex flex-col space-y-6">
                            <p className="font-poppins text-xl font-semibold">Selected NFTs:</p>
                            {/* Left side with NFT to trade */}
                            <div className="carousel p-4 bg-transparent">
                                {selectedNFTs.map((nft) => (
                                    <div className="carousel-item p-2 w-32 space-x-4 relative" key={uuidv4()}>
                                        <XCircleIcon key={uuidv4()} className="w-8 z-10 top-0 right-0 text-error absolute cursor-pointer" onClick={() => {
                                            for (let i = 0; i < selectedNFTs.length; i++) {
                                                if (selectedNFTs[i]?.name === nft.name) {
                                                    selectedNFTs.splice(i, 1)
                                                    setSelectedNFTs([...selectedNFTs])
                                                    setNftCollection([...nftCollection, nft])
                                                    break
                                                }
                                            }
                                        }} />
                                        <NFTCompactCard key={uuidv4()} src={nft?.image || ""} name={nft?.name ?? "name not found"} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <div className="bg-transparent border rounded-md p-1 w-full">
                                    <div className="inline-flex flex-col flex-start justify-center relative text-base-100">
                                        <div className="flex items-center">
                                            <input type="text" className="placeholder:text-base-100 placeholder:italic p-5 pl-8 h-8 bg-transparent outline-none"
                                                placeholder="Search NFT..." />
                                            <svg className="w-4 h-4 absolute left-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="font-poppins text-xl font-semibold">Your NFTs:</p>
                            <div className="overflow-y-scroll h-">
                                <div className="grid grid-cols-5 gap-3 p-4">
                                    {nftCollection?.map((nft) => (
                                        <div className="relative" key={uuidv4()}>
                                            <PlusCircleIcon key={uuidv4()} className="w-8 z-10 top-0 right-0 text-success absolute cursor-pointer" onClick={() => {
                                                setSelectedNFTs([...selectedNFTs, nft])
                                                for (let i = 0; i < nftCollection.length; i++) {
                                                    if (nftCollection[i]?.name === nft.name) {
                                                        console.log("selected: " + JSON.stringify(nft.name))
                                                        nftCollection.splice(i, 1)
                                                        setNftCollection([...nftCollection])
                                                        break
                                                    }
                                                }
                                            }} />
                                            <NFTCompactCard key={uuidv4()} src={nft?.image || ""} name={nft?.name ?? "name not found"} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 justify-center">
                            {/* Right side with NFT to obtain */}
                            <div className="flex flex-col items-center space-y-3">
                                <p className="font-poppins text-2xl">NFT to trade:</p>
                                <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                                    <figure className="px-10 pt-10">
                                        <img src={nft?.file_url || nft?.cached_file_url || nft?.metadata?.ipfs_image || nft?.metadata?.image} className="rounded-xl object-cover" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{nft?.name}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button className="btn btn-primary"
                                    disabled={disable}
                                    onClick={() => {
                                        approveAllSelectedNFTs()
                                        buildTrade()
                                    }}>
                                    Submit Offer
                                </button>
                                <label htmlFor="trade-modal" className="btn btn-secondary" onClick={() => setSelectedNFTs([])}>
                                    Close
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeModal
