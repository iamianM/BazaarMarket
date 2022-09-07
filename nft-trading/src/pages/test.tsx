import React, { useState } from 'react'
import CardPack from '../components/CardPack'
import ModalOpenPack from '../components/ModalOpenPack'
import ShowCard from '../components/ShowCard'

function TestPage() {

    const [openPack, setOpenPack] = useState(false)

    return (
        <div className='min-h-screen'>
            <div className='mt-40 flex flex-col space-y-10 justify-center items-center'>
                <ModalOpenPack />
            </div>
        </div>
    )
}

export default TestPage
