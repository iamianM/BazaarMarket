import React, { useState } from 'react'
import CardPack from '../components/CardPack'
import ModalOpenPack from '../components/ModalOpenPack'
import ShowCard from '../components/ShowCard'

function TestPage() {

    const [openPack, setOpenPack] = useState(false)

    const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } };

    // const res = fetch('https://deep-index.moralis.io/api/v2/0xc839eC222F6EC940980227B39B2ef0715EEF1718/nft?chain=rinkeby&format=decimal', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    return (
        <div className='min-h-screen'>
        </div>
    )
}

export default TestPage
