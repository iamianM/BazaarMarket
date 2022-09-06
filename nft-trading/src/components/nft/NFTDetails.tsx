import { useState } from 'react'
import NFTHistory from './NFTHistory'
import NFTOwnership from './NFTOwnership'

function NFTDetails() {

    const [activeTab, setActiveTab] = useState('ownership')

    return (
        <div>
            <ul className="flex border-b border-gray-100">
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('ownership')}>
                        {activeTab === 'ownership' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> Ownership </span>
                        </div>
                    </a>
                </li>
                <li className="flex-1 cursor-pointer">
                    <a className="relative block p-4" onClick={() => setActiveTab('history')}>
                        {activeTab === 'history' && <span className="absolute inset-x-0 w-full h-px bg-primary -bottom-px"></span>}
                        <div className="flex items-center justify-center">
                            <span className="ml-3 text-lg font-medium text-inherit"> History </span>
                        </div>
                    </a>
                </li>
            </ul>
            {activeTab === 'ownership' && <NFTOwnership />}
            {activeTab === 'history' && <NFTHistory />}
        </div>
    )
}

export default NFTDetails
