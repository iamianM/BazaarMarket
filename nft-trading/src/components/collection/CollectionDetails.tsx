import CollectionStats from "./CollectionStats"

function CollectionDetails() {
    return (
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="font-poppins text-3xl font-bold">IO: Imaginary Ones</h1>
            <div className="flex space-x-4">
                {/* <SocialIcon url="https://twitter.com/imaginaryones" />
                <SocialIcon url="https://instagram.com/imaginaryones" />
                <SocialIcon url="https://discord.gg/imaginaryones" /> */}
            </div>
            <p className="text-justify lg:text-center p-4 font-md font-poppins">Imaginary Ones is a delightful 3D animated art with a collection of 8888 unique NFTs. Imaginary Ones
                wish to re-ignite your spark to embrace creativity and work on your dreams. Welcome to the Imaginary
                World, where no ideas too crazy nor dreams too foolish.</p>
            <CollectionStats />
        </div>
    )
}

export default CollectionDetails
