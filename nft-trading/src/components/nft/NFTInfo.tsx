import LoremIpsum from "react-lorem-ipsum"
import NFTCategory from "./NFTCategory"
import NFTCollectionAvatar from "./NFTCollectionAvatar"
import NFTCreatorAvatar from "./NFTCreatorAvatar"
import NFTDetails from "./NFTDetails"
import NFTRank from "./NFTRank"

function NFTInfo() {
    return (
        <div className="mt-28">
            <div className="bg-white flex flex-col space-y-10 bg-opacity-25 backdrop-blur-xl rounded-2xl shadow-md p-5">
                <div className="flex justify-between">
                    <NFTCreatorAvatar />
                    <NFTCollectionAvatar />
                </div>
                <NFTRank />
                <p className="font-poppins"><LoremIpsum p={1} /></p>
                <NFTCategory />
                <div className="mx-12 mt-5">
                    <NFTDetails />
                </div>
            </div>
        </div>
    )
}

export default NFTInfo
