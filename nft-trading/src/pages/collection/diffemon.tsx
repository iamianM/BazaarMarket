import { useState } from 'react'
import CollectionBanner from '../../components/collection/CollectionBanner'
import CollectionDetails from '../../components/collection/CollectionDetails'
import DiffemonCollection from "../../../data/diffemonCollection.json"
import Diffemon from "../../../data/Diffemon.json"


function DiffemonCollectionPage() {

    const [imageToShow, setImageToShow] = useState<string>("")

    return (
        <div className="min-h-screen">
            <input type="checkbox" id="diffemon-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <label htmlFor="diffemon-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <img className='w-full h-full rounded-t-xl object-cover' src={imageToShow} alt="banner" />
                </div>
            </div>
            <div className='flex flex-col'>
                <CollectionBanner banner={DiffemonCollection.attributes.image_preview_large_url} logo="/diffemon/corgichu.png" />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-4/5 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <CollectionDetails name={DiffemonCollection.attributes.name} description={DiffemonCollection.attributes.description} total={DiffemonCollection.attributes.tokens} owners={DiffemonCollection.attributes.unique_owners} />
                </div>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl mt-10 mb-10 p-4 shadow-lg mx-auto rounded-lg' >
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto mt-10 gap-6 xl:gap-8'>
                        {Diffemon.map((item: any, index: number) => (
                            <div key={index} onClick={() => setImageToShow(`/diffemon/${index}.png`)}>
                                <div className="card card-normal w-96 glass shadow-xl cursor-pointer">
                                    <label htmlFor="diffemon-modal" className='cursor-pointer'>
                                        <figure className="px-10 pt-10">
                                            <img src={`/diffemon/${index}.png`}
                                                className="rounded-xl object-cover" />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{item.name}</h2>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiffemonCollectionPage