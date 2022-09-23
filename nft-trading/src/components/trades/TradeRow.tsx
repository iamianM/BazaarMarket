import React from 'react'
import { SwapRequest, NftMaker, NftTaker } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import NFTTraderSDK from "@nfttrader-io/sdk-js"
import { toast } from 'react-hot-toast'
import { useAccount } from "wagmi"
import { erc721ABI } from 'wagmi'
import { NftTraderRinkeby } from "../../../constants"

function TradeRow({ swap }: {
    swap:
    (SwapRequest & {
        NFTMaker: NftMaker[];
        NFTTaker: NftTaker[];
    }) | undefined
}) {

    const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null)
    const { address } = useAccount()

    useEffect(() => {
        const loadProviders = async () => {
            if (typeof window !== 'undefined') {
                // @ts-ignore
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider.send('eth_requestAccounts', [])
                setEthersProvider(provider)
            }
        }
        loadProviders()
    }, [])

    const sdk = new NFTTraderSDK({
        ethers: ethers, //you need to provide the instance of ethers js library
        web3Provider: ethersProvider, //or an instance of ethers.providers.Web3Provider
        network: "RINKEBY", //example: 'ETHEREUM', 'RINKEBY', 'POLYGON', 'MUMBAI', 'XDAI'
    })

    const getSwapDetails = async () => {
        const {
            addressMaker, //the address of the maker
            addressTaker, //the address of the taker (counterparty)
            status, //status of the swap. 0 means opened, 1 means closed, 2 means canceled
        } = await sdk.getSwapDetails(swap?.swapId)
        console.log(addressMaker, addressTaker, status)
    }


    const signer = ethersProvider?.getSigner(address)
    console.log("Signer: " + signer)

    const approveTakerNFTs = () => {
        swap?.NFTTaker.forEach(async (nft) => {
            console.log("Contract address:", nft.contractAddress.trim())
            const nftContract = new ethers.Contract(nft.contractAddress, erc721ABI, signer)
            console.log(NftTraderRinkeby)
            await nftContract.setApprovalForAll(NftTraderRinkeby, true)
        });
    }


    const acceptTrade = async () => {
        sdk.on("closeSwapTransactionCreated", ({ tx }: { tx: any }) => {
            //make something
            toast.success("Transaction created")
            //tx object is an instance of the class TransactionResponse. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse]
        })
        sdk.on("closeSwapTransactionMined", ({ receipt }: { receipt: any }) => {
            //make something
            toast.success("Transaction mined")
            //receipt object is an instance of the class TransactionReceipt. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt]
        })
        sdk.on("closeSwapTransactionError", ({ error, typeError }: { error: any, typeError: any }) => {
            //make something
            toast.error("Transaction error")
            console.log(error)
            //typeError value can be: closeSwapIntentError or waitError. The first one means the error is occured during the process creation of the transaction. The second one means the error is occured during the mining process of the transaction.
        })
        await sdk.closeSwap({
            swapId: swap?.swapId, //unique identifier of the swap (mandatory)
        },
        )
    }

    const declineTrade = async () => {
        sdk.on("cancelSwapTransactionCreated", ({ tx }: { tx: any }) => {
            //make something
            toast.success("Transaction created")
            //tx object is an instance of the class TransactionResponse. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse]
        })
        sdk.on("cancelSwapTransactionMined", ({ receipt }: { receipt: any }) => {
            //make something
            toast.success("Transaction mined")
            //receipt object is an instance of the class TransactionReceipt. For more info visit the ethers js docs [https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt]
        })
        sdk.on("cancelSwapTransactionError", ({ error, typeError }: { error: any, typeError: any }) => {
            //make something
            toast.error("Transaction error")
            console.log(error)
            //typeError value can be: cancelSwapIntentError or waitError. The first one means the error is occured during the process creation of the transaction. The second one means the error is occured during the mining process of the transaction.
        })
        await sdk.cancelSwap({
            swapId: swap?.swapId, //unique identifier of the swap (mandatory)
        })
        sdk.off('cancelSwapTransactionCreated') //remove all the listener
        sdk.off('cancelSwapTransactionMined') //remove all the listener
        sdk.off('cancelSwapTransactionError') //remove all the listener
    }

    return (
        <div className="p-5 bg-secondary rounded-box shadow-xl">
            <div className='flex justify-between items-center'>
                <div className='flex space-x-1 w-1/3'>
                    {swap?.NFTMaker?.map((nft) => (
                        <div key={uuidv4()}>
                            <div className='flex-col space-y-1'>
                                {nft?.image ? (
                                    <img src={nft.image} alt={nft.name} className='w-14 h-14' />
                                ) : (
                                    <div>{nft.name}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-1/3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                </div>
                <div className='w-1/3'>
                    {swap?.NFTTaker?.map((nft) => (
                        <div key={uuidv4()}>
                            <div className='flex-col space-y-1'>
                                <img src={nft.image ?? ""} alt={nft.name} className='w-10 h-10' />
                                <div>{nft.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col space-y-5">
                <div className='flex space-x-2'>
                    <p>Offer from: </p>
                    <Link href={`/profile/${swap?.addressMaker}`}>
                        <a className='cursor-pointer hover:underline hover:text-info'>{swap?.addressMaker}</a>
                    </Link>
                </div>
                <button onClick={getSwapDetails}>Get swap details</button>
                {swap?.NFTMaker?.map((nft) => (
                    <div key={uuidv4()}>
                        <div className='flex items-center justify-between'>
                            <div className='flex space-x-3 items-center'>
                                <img src={nft.image ?? ""} alt={nft.name} className='w-10 h-10' />
                                <p>{nft.name}</p>
                            </div>
                            <Link href={`/nft/${nft?.contractAddress}/${nft?.tokenId}`}>
                                <a className="btn btn-sm btn-outline btn-primary normal-case">Details</a>
                            </Link>
                        </div>
                    </div>
                ))}
                {swap?.addressTaker === address && (
                    <div className='flex justify-evenly items-center'>
                        <button className="btn btn-sm btn-outline btn-primary normal-case"
                            onClick={() => approveTakerNFTs()}>Approve</button>
                        <button className="btn btn-sm btn-outline btn-primary normal-case"
                            onClick={() => acceptTrade()}>Accept</button>
                        <button className="btn btn-sm btn-outline btn-primary normal-case"
                            onClick={() => declineTrade()}>Decline</button>
                    </div>)}
            </div>

        </div>
    )
}

export default TradeRow