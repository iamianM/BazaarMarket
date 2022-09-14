import CollectionBanner from '../../components/collection/CollectionBanner'
import CollectionDetails from '../../components/collection/CollectionDetails'
import CollectionInfo from '../../components/collection/CollectionInfo'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

function CollectionPage() {

    type Collection = {
        response: string
        nfts: []
        contract: {
            name: string
            symbol: string
            type: string
            metadata: {
                description: string
                thumbnail_url: string
                banner_url: string
                cached_tumbnail_url: string
                cached_banner_url: string
            }
            total: number
        }
    }

    const router = useRouter()
    const contract_address = router.query.contract_address
    const { data } = useQuery('collection', () => fetchCollection())
    const collection: Collection = data

    const fetchCollection = async () => {
        const res = await fetch(`/api/collection/${contract_address}`)
        const data = await res.json()
        return data
    }

    return (
        <div className="min-h-screen">
            <div className='flex flex-col'>
                <CollectionBanner banner={collection?.contract?.metadata?.banner_url} logo={collection?.contract?.metadata?.thumbnail_url} />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-2/3 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <CollectionDetails name={collection?.contract?.name} description={collection?.contract?.metadata?.description} />
                </div>
                <div className='bg-white bg-opacity-50 backdrop-blur-xl mt-10 mb-10 p-4 shadow-lg mx-auto rounded-lg' >
                    <CollectionInfo />
                </div>
            </div>
        </div>
    )
}

export default CollectionPage
