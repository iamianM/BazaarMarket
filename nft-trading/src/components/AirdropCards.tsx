import ModalHidden from "./ModalHidden"
import ModalOpenPack from "./ModalOpenPack"


function AirdropCards() {
    return (
        <div className="mt-10 pb-8">
            <ModalHidden />
            <div className="bg-secondary-focus bg-opacity-50 backdrop-blur-xl p-10 rounded-xl shadow-xl">
                <h1 className="font-poppins font-bold text-3xl xl:text-5xl uppercase text-center">Sign in to get a pack with 6 NFTs for free*</h1>
                <p className="text-sm text-center">*only on polygon, transaction fees not included</p>
                <div className="flex justify-center mt-10">
                    <ModalOpenPack />
                </div>
                <img src="/skyline.png" className="rounded-b-xl" />
            </div>

        </div>
    )
}

export default AirdropCards
