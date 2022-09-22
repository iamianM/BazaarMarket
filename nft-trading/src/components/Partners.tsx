import Image from "next/image"

function Partners() {
    return (
        <div className="flex items-center justify-evenly mt-10 mx-auto">
            <img src="/ethereum.svg" alt="" className="h-12 md:h-20" />
            <img src="/moralis.svg" alt="" className="h-12 md:h-20" />
        </div>
    )
}

export default Partners