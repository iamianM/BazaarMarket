import Image from "next/image"

function Partners() {
    return (
        <div className="flex items-center justify-evenly mt-10 mx-auto">
            <img src="/ethereum.svg" alt="" className="h-12 md:h-20" />
            <img src="/polygon_logo.png" alt="" className="h-24 md:h-20" />
            <img src="/nftport_new_logo.svg" alt="" className="h-8 md:h-20" />
        </div>
    )
}

export default Partners