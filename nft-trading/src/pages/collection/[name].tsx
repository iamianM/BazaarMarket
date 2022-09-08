import CollectionBanner from '../../components/collection/CollectionBanner'
import CollectionDetails from '../../components/collection/CollectionDetails'
import CollectionInfo from '../../components/collection/CollectionInfo'

function CollectionPage() {
    return (
        <div className="bg-gradient-to-tr min-h-screen from-primary via-secondary to-neutral">
            <div className='flex flex-col'>
                <CollectionBanner />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-2/3 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <CollectionDetails />
                </div>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl mt-10 mb-10 p-4 shadow-lg mx-auto rounded-lg' >
                    <CollectionInfo />
                </div>
            </div>
        </div>
    )
}

export default CollectionPage
