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
                <p className="font-poppins">
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Sapien sapien cursus inceptos ligula purus porta. Neque dolor risus aenean dictumst maecenas odio praesent fusce duis? Finibus elit velit volutpat imperdiet aenean ultrices eget donec. Augue vitae mus enim ultrices parturient eget ridiculus efficitur urna. Ornare platea taciti primis vivamus erat. Himenaeos bibendum curabitur vehicula taciti habitasse rutrum. Nisl venenatis per habitasse hendrerit arcu magnis.
                </p>
                <NFTCategory />
                <div className="mx-12 mt-5">
                    <NFTDetails />
                </div>
            </div>
        </div>
    )
}

export default NFTInfo
