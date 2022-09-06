import CreatorNFTCard from "./CreatorNFTCard"

function CreatorNFTs() {
    return (
        <div className="grid grid-cols-3 max-w-7xl mr-24 mt-10 gap-8">
            <CreatorNFTCard src="/collection1.png" />
            <CreatorNFTCard src="/collection2.png" />
            <CreatorNFTCard src="/collection3.png" />
            <CreatorNFTCard src="/collection4.png" />
            <CreatorNFTCard src="/collection5.png" />
            <CreatorNFTCard src="/collection6.png" />
            <CreatorNFTCard src="/collection7.png" />
            <CreatorNFTCard src="/collection8.png" />
            <CreatorNFTCard src="/collection9.png" />
        </div>
    )
}

export default CreatorNFTs
