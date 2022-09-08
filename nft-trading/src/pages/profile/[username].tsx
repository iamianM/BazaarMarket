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
            <img src="/banner.jpeg" alt="banner" className="w-full h-96 object-cover relative" />
            <main className="flex flex-col justify-center w-auto lg:grid md:grid-cols-1 lg:grid-cols-3 gap-10 mx-auto">
                <section className="md:col-span-1">
                    <CreatorDescription />
                </section>
                <section className="md:col-span-1 xl:col-span-2 md:max-w-lg lg:max-w-3xl xl:max-w-4xl mx-auto mb-10 mt-5">
                    <CreatorCollectionCarousel />
                    <CreatorNFTInfo />
                </section>
            </main>
        </div>
    )
}

export default ProfilePage