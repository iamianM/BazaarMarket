import Link from "next/link"
import SearchBar from "./SearchBar"
import ThemeSelector from "./ThemeSelector"
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

function Header() {

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { isConnected } = useAccount();

    return (
        <header className="fixed top-0 right-0 left-0 p-7 z-50 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <Link href={"/"}>
                    <a className="font-bold text-2xl text-base-100">Babylon<span className="text-primary-focus">Traders</span></a>
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
                        <button className="btn btn-sm btn-outline btn-primary ml-3 normal-case" onClick={openAccountModal}>Profile</button>
                        <button className="btn btn-sm btn-outline btn-primary ml-3 normal-case" onClick={openChainModal}>Chain</button>
                    </>)
                    :
                    (<button className="p-2 rounded-md bg-gradient-to-tr from-primary to-secondary shadow-md" onClick={openConnectModal}>
                        <p className="lg:inline font-poppins text-inherit">Connect wallet</p>
                    </button>)
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
