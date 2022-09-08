import ProfileNFTCard from "./ProfileNFTCard"

function ProfileNFTs() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2
        max-w-xl lg:max-w-2xl xl:max-w-4xl mx-auto mt-10
        gap-8">
            <ProfileNFTCard src="/collection1.png" />
            <ProfileNFTCard src="/collection2.png" />
            <ProfileNFTCard src="/collection3.png" />
            <ProfileNFTCard src="/collection4.png" />
            <ProfileNFTCard src="/collection5.png" />
            <ProfileNFTCard src="/collection6.png" />
            <ProfileNFTCard src="/collection7.png" />
            <ProfileNFTCard src="/collection8.png" />
            <ProfileNFTCard src="/collection9.png" />
        </div>
    )
}

export default ProfileNFTs
