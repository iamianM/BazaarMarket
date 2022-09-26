import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ProfileBanner from '../../components/profile/ProfileBanner'
import ProfileCollectionCarousel from '../../components/profile/ProfileCollectionCarousel'
import ProfileDescription from '../../components/profile/ProfileDescription'
import ProfileNFTInfo from '../../components/profile/ProfileNFTInfo'

function ProfilePage() {

    const router = useRouter()
    const address = router.query.address

    return (
        <div className="min-h-screen">
            <div className='flex flex-col'>
                <ProfileBanner address={address} />
                <div className='bg-white bg-opacity-50 backdrop-blur-xl w-3/4 -mt-32 p-9 lg:p-12 shadow-lg mx-auto rounded-lg'>
                    <ProfileDescription address={address} />
                </div>
                <div>
                    <ProfileCollectionCarousel address={address} />
                </div>
                <div>
                    <ProfileNFTInfo address={address} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage