import Link from "next/link"
import SearchBar from "./SearchBar"
import ThemeSelector from "./ThemeSelector"
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { signIn, signOut, useSession } from "next-auth/react";
import { UserCircleIcon, StarIcon, PhotographIcon } from '@heroicons/react/outline'

function Header() {

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { isConnected } = useAccount();

    const { data: session, status } = useSession();
    console.log(session)

    return (
        <header className="fixed top-0 right-0 left-0 p-7 z-50 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <a className="font-bold text-2xl text-base-100">Meta<span className="text-primary-focus">TraderZ</span></a>
                </Link>
                <div className="hidden md:inline-flex">
                    <SearchBar placeholder="Search for collections" />
                </div>
                <div className="hidden xl:flex xl:space-x-7">
                    <Link href={"/"}>
                        <a className="text-base-100 text-xl font-poppins">Collections</a>
                    </Link>
                    <Link href={"/"}>
                        <a className="text-base-100 text-xl font-poppins">Featured</a>
                    </Link>
                    <Link href={"/"}>
                        <a className="text-base-100 text-xl font-poppins">FAQ</a>
                    </Link>
                </div>
                {isConnected ?
                    (<>
                        <button className="btn btn-sm btn-outline btn-primary normal-case" onClick={openAccountModal}><p>Profile</p></button>
                        <button className="btn btn-sm btn-outline btn-primary normal-case" onClick={openChainModal}><p>Chain</p></button>
                    </>)
                    :
                    (<button className="p-2 rounded-md bg-gradient-to-tr from-primary to-secondary shadow-md" onClick={openConnectModal}>
                        <p className="lg:inline font-poppins text-inherit">Connect wallet</p>
                    </button>)
                }
                {session ?
                    <div className="flex space-x-2 items-center">
                        <button className="btn btn-sm btn-outline btn-primary normal-case" onClick={() => signOut()}>
                            <p>Sign Out</p>
                        </button>
                        <img src={session?.user?.image as string} className="peer rounded-full w-8 h-8 cursor-pointer" />
                        <div className="hidden absolute peer-hover:flex hover:flex
                                        w-[200px] top-16 rounded-2xl
                                        flex-col bg-white bg-opacity-50 backdrop-blur-xl drop-shadow-lg">
                            <div className="flex items-center space-x-2 px-5 py-3  hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl rounded-2xl">
                                <UserCircleIcon className="h-6 w-6" />
                                <a className="font-poppins" href="#">Profile</a>
                            </div>
                            <div className="flex items-center space-x-2 px-5 py-3 hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl rounded-2xl">
                                <StarIcon className="h-6 w-6" />
                                <a className="font-poppins" href="#">Favorites</a>
                            </div>
                            <div className="flex items-center space-x-2 px-5 py-3 rounded-2xl hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl">
                                <PhotographIcon className="h-6 w-6" />
                                <a className="font-poppins " href="#">My Collection</a>
                            </div>
                            <div className="flex items-center space-x-2 px-5 py-3 rounded-2xl hover:bg-white hover:bg-opacity-25 hover:backdrop-blur-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                                <a className="font-poppins" href="#">My Trades</a>
                            </div>
                        </div>
                    </div>
                    :
                    <button className="btn btn-sm btn-outline btn-primary ml-3 normal-case" onClick={() => signIn("discord")}>Sign In</button>
                }
                <div className="hidden lg:inline-block">
                    <ThemeSelector />
                </div>
            </div>
            <div className="divider" />
        </header>
    )
}

export default Header
