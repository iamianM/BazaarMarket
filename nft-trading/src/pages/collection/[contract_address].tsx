import CollectionBanner from '../../components/collection/CollectionBanner'
import CollectionDetails from '../../components/collection/CollectionDetails'
import CollectionInfo from '../../components/collection/CollectionInfo'
import { useRouter } from 'next/router'

function CollectionPage() {

    type Data = {
        address: string
        description: string
        external_url: string
        image_url: string
        image: string
        name: string
        tokens: number
        unique_owners: number
        banner?: string
    }

    const router = useRouter()
    const contract_address = router.query.contract_address
    const queryData: Data = JSON.parse(router.query.data as string ?? "{}")

    return (
        <div className="min-h-screen">
            <div className='flex flex-col'>
                <CollectionBanner logo={queryData?.image_url ?? queryData?.image} banner={queryData?.banner} />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-4/5 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <CollectionDetails name={queryData.name} description={queryData.description} total={queryData?.tokens} owners={queryData.unique_owners} />
                </div>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl mt-10 mb-10 p-4 shadow-lg mx-auto rounded-lg' >
                    <CollectionInfo contract_address={contract_address} />
                </div>
            </div>
        </div>
    )
}

export default CollectionPage
