import { useState } from "react"
import CreatorNFTs from "./CreatorNFTs"
function CreatorNFTInfo() {

    const [activeTab, setActiveTab] = useState('collectibles')

    return (
        <>
            <ul className="flex border-b border-gray-100 mt-10 max-w-md lg:max-w-2xl mx-auto">
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('collectibles')}>
                        {activeTab === 'collectibles' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> Collectibles </span>
                        </div>
                    </a>
                </li>
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('trading')}>
                        {activeTab === 'trading' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> Trading </span>
                        </div>
                    </a>
                </li>
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('created')}>
                        {activeTab === 'created' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> Created </span>
                        </div>
                    </a>
                </li>
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('liked')}>
                        {activeTab === 'liked' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> Liked </span>
                        </div>
                    </a>
                </li>
            </ul>
            {activeTab === 'collectibles' && (<CreatorNFTs />)}
        </>
    )
}

export default CreatorNFTInfo