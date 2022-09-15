import { useState } from "react"
import CollectionItems from "./CollectionItems"
import CollectionActivity from "./CollectionActivity"

function CollectionInfo({ contract_address }: { contract_address: any }) {

    const [activeTab, setActiveTab] = useState('nfts')

    return (
        <>
            <div>
                <ul className="flex border-b border-gray-100">
                    <li className="flex-1 cursor-pointer">
                        <a className="relative block p-4" onClick={() => setActiveTab('nfts')}>
                            {activeTab === 'nfts' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                            <div className="flex items-center justify-center">
                                <span className="ml-3 text-lg font-medium text-inherit"> NFTs </span>
                            </div>
                        </a>
                    </li>
                    <li className="flex-1 cursor-pointer">
                        <a className="relative block p-4" onClick={() => setActiveTab('activity')}>
                            {activeTab === 'activity' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                            <div className="flex items-center justify-center">
                                <span className="ml-3 text-lg font-medium text-inherit"> Activity </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            {activeTab === 'nfts' && <CollectionItems contract_address={contract_address} />}
            {activeTab === 'activity' && <CollectionActivity />}
        </>
    )
}

export default CollectionInfo
