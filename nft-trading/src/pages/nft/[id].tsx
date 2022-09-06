import { useRouter } from "next/router"
import NFTInfo from "../../components/nft/NFTInfo"
import NFTShowCard from "../../components/nft/NFTShowCard"

function NFTPage() {
    const router = useRouter()
    const username = router.query.username

    return (
        <div className="bg-gradient-to-tr min-h-screen from-primary via-secondary to-neutral">
            <main className="flex flex-col justify-center max-w-7xl lg:grid lg:grid-cols-3 lg:gap-10 mx-auto">
                <section className="lg:col-span-1 ">
                    <NFTShowCard src="/collection1.png" />
                </section>
                <section className="lg:col-span-2 mb-10 mt-5">
                    <NFTInfo />
                </section>
            </main>
        </div>
    )
}

export default NFTPage
