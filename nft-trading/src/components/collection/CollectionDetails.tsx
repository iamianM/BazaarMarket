import CollectionStats from "./CollectionStats"

function CollectionDetails({ name, description, total, owners }: { name: string, description: string, total: number, owners: number }) {
    return (
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="font-poppins text-3xl mt-4 font-bold">{name}</h1>
            <div className="flex space-x-4">
                {/* <SocialIcon url="https://twitter.com/imaginaryones" />
                <SocialIcon url="https://instagram.com/imaginaryones" />
                <SocialIcon url="https://discord.gg/imaginaryones" /> */}
            </div>
            <p className="text-justify lg:text-center font-md font-poppins">{description}</p>
            <CollectionStats total={total} owners={owners} />
        </div>
    )
}

export default CollectionDetails
