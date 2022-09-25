import { useEffect } from 'react'
import CardPack from './CardPack'
import { useState } from "react"
import ShowCard from './ShowCard'
import { useProvider, useAccount, usePrepareContractWrite, useContractWrite, useSigner } from 'wagmi'
import { DiffemonRinkeby, DiffemonBoosterCode } from '../../constants'
import DiffemonABI from "../abi/DiffemonABI.json"
import { ethers } from 'ethers'
import { toast } from 'react-hot-toast'
import { trpc } from '../utils/trpc'

function ModalOpenPack() {

    const [opened, setOpened] = useState(false)
    const { address } = useAccount()
    const [code, setCode] = useState('')
    const [diffemonContract, setDiffemonContract] = useState<ethers.Contract | null>(null)
    const [isAllotted, setIsAllotted] = useState(false)


    useEffect(() => {
        const loadContract = async () => {
            if (typeof window !== 'undefined') {
                const provider: ethers.providers.Provider = new ethers.providers.Web3Provider((window as any).ethereum)
                const signer = new ethers.Wallet("53b75ea781e20f63f0a5b0c883e3ce340e66d6ce0bbc88f3cd2ba4b26a48274a", provider)
                // @ts-ignore
                const diffemonContract = new ethers.Contract(DiffemonRinkeby, DiffemonABI, signer)
                setDiffemonContract(diffemonContract)
            }
        }
        loadContract()
    }, [])

    const allotBoosters = async () => {
        await diffemonContract?.allotBoosters(address, 1)
    }

    const allotPackets = async () => {
        if (code === DiffemonBoosterCode) {
            try {
                allotBoosters?.()
                setIsAllotted(true)
                toast.success("Packet correctly allotted!")
            }
            catch (e) { toast.error("Ops! Something went wrong, try again later") }
        } else {
            toast.error("You entered a wrong code")
        }
    }

    const getCards = async () => {
        try {
            await diffemonContract?.buyBooster()
            toast.success("Cards correctly minted!")
        } catch (e) {
            toast.error("Ops! Something went wrong, try again later")
            console.error(e)
        }
    }

    return (
        <>
            {/* <label htmlFor="my-modal-6" className="modal-button"> */}
            <div className='flex flex-col space-y-3 justify-center items-center'>
                <input type="text" placeholder='Insert your code here...' className='p-5 h-8 placeholder:text-base-100 placeholder:italic rounded-md bg-transparent border shadow-lg outline-none'
                    onChange={(e) => setCode(e.target.value)} />
                <div className='shadow-2xl cursor-pointer flex justify-center items-center rounded-full w-32 h-32 bg-gradient-to-bl from-white via-yellow-200 to-secondary'>
                    <p className='font-poppins text-lg' onClick={() => allotPackets()}>Claim</p>
                </div>
                {isAllotted && <button className='btn btn-primary' onClick={() => getCards()}>Mint your cards</button>}
            </div>
            {/* </label> */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-auto max-w-5xl">
                    <div className='mt-5'>
                        {!opened &&
                            <div className='flex flex-col space-y-4'>
                                <h3 className="font-bold text-lg text-center">Click on the pack to open it</h3>
                                <div className='flex justify-center'>
                                    <button onClick={() => setOpened(true)}>
                                        <CardPack />
                                    </button>
                                </div>
                            </div>}
                        {opened &&
                            (
                                <div className='flex flex-col space-y-4'>
                                    <h3 className="font-bold text-lg text-center">Click on the cards to reveal them</h3>
                                    <div className='grid grid-cols-5 gap-4 p-5'>
                                        <ShowCard src="/cards/card2.png" />
                                        <ShowCard src="/cards/card3.png" />
                                        <ShowCard src="/cards/card4.png" />
                                        <ShowCard src="/cards/card5.png" />
                                        <ShowCard src="/cards/card6.png" />
                                        <ShowCard src="/cards/card7.png" />
                                        <ShowCard src="/cards/card8.png" />
                                        <ShowCard src="/cards/card9.png" />
                                        <ShowCard src="/cards/card10.png" />
                                        <ShowCard src="/cards/card11.png" />
                                    </div>
                                </div>)}
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Done</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalOpenPack
