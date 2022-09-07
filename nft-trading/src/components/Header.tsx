import Link from "next/link"
import SearchBar from "./SearchBar"
import ThemeSelector from "./ThemeSelector"
import ConnectWallet from "./ConnectWallet"

function Header() {
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
                <ConnectWallet />
                <div className="hidden lg:inline-block">
                    <ThemeSelector />
                </div>
            </div>
            <div className="divider" />
        </header>
    )
}

export default Header
