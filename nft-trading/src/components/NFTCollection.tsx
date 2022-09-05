import NFTCard from "./NFTCard"

function NFTCollection() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">Featured Collections</h1>
                <p className="font-poppins text-lg mt-5">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="grid grid-cols-3 max-w-7xl mx-auto mt-10 gap-8">
                <NFTCard src="./collection1.png" />
                <NFTCard src="./collection2.png" />
                <NFTCard src="./collection3.png" />
                <NFTCard src="./collection4.png" />
                <NFTCard src="./collection5.png" />
                <NFTCard src="./collection6.png" />
                <NFTCard src="./collection7.png" />
                <NFTCard src="./collection8.png" />
                <NFTCard src="./collection9.png" />
            </div>
        </div>
    )
}

export default NFTCollection