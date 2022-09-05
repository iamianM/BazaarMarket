import React from 'react'
import { LoremIpsum } from 'react-lorem-ipsum';

function FrontHero() {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse mt-32">
                <img src="/heroimage.png" className="max-w-lg rounded-lg" />
                <div className='mr-10'>
                    <h1 className="text-5xl font-bold font-poppins text-base/[.16]">Trade & Collect NFTs!</h1>
                    <p className="py-6 font-poppins"><LoremIpsum p={1} /></p>
                    <div className='flex space-x-4'>
                        <button className="btn btn-secondary">Explore</button>
                        <button className="btn btn-primary">Trade</button>
                    </div>
                    <div className="flex justify-between mt-10">
                        <div className="">
                            <p className="font-bold text-xl">37k+</p>
                            <p className=" ">Artworks</p>
                        </div>
                        <div className="">
                            <p className="font-bold text-xl">20k+</p>
                            <p className="">Artist</p>
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