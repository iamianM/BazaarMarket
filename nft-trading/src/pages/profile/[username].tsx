import { useRouter } from 'next/router'
import CreatorBanner from '../../components/creator/CreatorBanner'
import CreatorCollectionCarousel from '../../components/creator/CreatorCollectionCarousel'
import CreatorDescription from '../../components/creator/CreatorDescription'
import CreatorNFTInfo from '../../components/creator/CreatorNFTInfo'
import Header from '../../components/Header'

function ProfilePage() {

    const router = useRouter()
    const username = router.query.username

    return (
        <div className="bg-gradient-to-tr min-h-screen from-primary via-secondary to-neutral">
            <CreatorBanner />
            <main className="flex flex-col justify-center w-auto lg:grid lg:grid-cols-3 lg:gap-10 mx-auto">
                <section className="lg:col-span-1">
                    <CreatorDescription />
                </section>
                <section className="lg:col-span-2 mb-10 mt-5">
                    <CreatorCollectionCarousel />
                    <CreatorNFTInfo />
                </section>
            </main>
        </div>
    )
}

export default ProfilePage