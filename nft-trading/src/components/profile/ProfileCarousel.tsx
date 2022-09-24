import ProfileCard from "./ProfileCard"
import makeBlockie from "ethereum-blockies-base64"

function ProfileCarousel() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">Featured Artists</h1>
                <p className="font-poppins text-lg mt-5">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="carousel carousel-center max-w-7xl mx-auto mt-10 p-4 space-x-4 bg-transparent rounded-box">
                <div className="carousel-item">
                    <ProfileCard src={makeBlockie("0x42E5eAA83BA51776Aefa4981419186d96ebbeD2A")} name={"Great Gatsby"} />
                </div>
                <div className="carousel-item">
                    <ProfileCard src={makeBlockie("0xfD9A2B1543864ec9d8c564ba13F2d38865e7BAe9")} name={"Fred Flinstones"} />
                </div>
                <div className="carousel-item">
                    <ProfileCard src={makeBlockie("0xCd8248589E085446aAbD028E97393a20A1b6C48d")} name={"Tony Stark"} />
                </div>
                <div className="carousel-item">
                    <ProfileCard src={makeBlockie("0x904344c40a55b953F8494058DbADc008b193d5fa")} name={"MegaArtist"} />
                </div>
            </div>
        </div>
    )
}

export default ProfileCarousel