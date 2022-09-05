import Image from "next/image"

function Partners() {
    return (
        <div className="flex items-center justify-evenly max-w-7xl mx-auto mt-10">
            <img src="/ethereum.svg" alt="" className="h-20" />
            <img src="/moralis.svg" alt="" className="h-20" />
        </div>
    )
}

export default Partners