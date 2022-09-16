import Link from "next/link"

function FrontHero() {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse mx-auto mt-32">
                <img src="/heroimage.png" className="max-w-sm rounded-lg" />
                <div className='mr-10'>
                    <h1 className="text-5xl font-bold font-poppins">Trade & Collect NFTs!</h1>
                    <p className="py-6 font-poppins">
                        Lorem ipsum odor amet, consectetuer adipiscing elit. Ultrices orci accumsan non faucibus efficitur sem senectus viverra. Dapibus volutpat non quis nisi suscipit bibendum maecenas. Elit netus facilisi tortor mattis amet. Malesuada sollicitudin ex vitae inceptos urna. Accumsan tincidunt torquent faucibus efficitur aptent! Natoque vehicula nunc taciti phasellus suspendisse ipsum magna accumsan. Natoque euismod adipiscing ullamcorper congue magnis mauris.
                    </p>
                    <div className='flex space-x-4'>
                        <Link href="/collections">
                            <button className="btn btn-secondary shadow-md">Explore</button>
                        </Link>
                        <button className="btn btn-primary shadow-md">Trade</button>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="">
                            <p className="font-bold text-xl">37k+</p>
                            <p className=" ">Artworks</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">20k+</p>
                            <p className="">Artists</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">99k+</p>
                            <p className="">Trades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrontHero