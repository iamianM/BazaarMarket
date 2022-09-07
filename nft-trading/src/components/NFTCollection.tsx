import NFTCard from "./NFTCard"

function NFTCollection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 
        max-w-lg md:max-w-3xl xl:max-w-7xl mx-auto mt-10 
        gap-6 xl:gap-8">
            <NFTCard src="/collection1.png" />
            <NFTCard src="/collection2.png" />
            <NFTCard src="/collection3.png" />
            <NFTCard src="/collection4.png" />
            <NFTCard src="/collection5.png" />
            <NFTCard src="/collection6.png" />
            <NFTCard src="/collection7.png" />
            <NFTCard src="/collection8.png" />
            <NFTCard src="/collection9.png" />
        </div>
    )
}

export default NFTCollection