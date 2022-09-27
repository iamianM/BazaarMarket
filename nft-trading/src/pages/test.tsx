import React, { useEffect, useState } from 'react'
import Diffemon from "../../data/Diffemon.json"

function TestPage() {

    const [openPack, setOpenPack] = useState(false)

    const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } };

    console.log(Diffemon)

    // const res = fetch('https://deep-index.moralis.io/api/v2/0xc839eC222F6EC940980227B39B2ef0715EEF1718/nft?chain=rinkeby&format=decimal', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    return (
        <div className='min-h-screen justify-center flex items-center'>
            <div className='flex flex-col items-center'>
                {Diffemon.map((item: any, index: number) => (
                    <div key={index}>
                        <img className='w-96' src={`/diffemon/${index}.png`} alt="" />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestPage
