import ProfileCard from "./ProfileCard"

function ProfileCarousel() {
    return (
        <div className="mt-24">
            <div className="text-center">
                <h1 className="text-5xl font-bold font-poppins">Featured Artists</h1>
                <p className="font-poppins text-lg mt-5">Lorem ipsum dolor sit amet</p>
            </div>
            <div className="carousel carousel-center max-w-7xl mx-auto mt-10 p-4 space-x-4 bg-transparent rounded-box">
                <div className="carousel-item">
                    <ProfileCard src="./creator1.png" />
                </div>
                <div className="carousel-item">
                    <ProfileCard src="./creator1.png" />
                </div>
                <div className="carousel-item">
                    <ProfileCard src="./creator1.png" />
                </div>
                <div className="carousel-item">
                    <ProfileCard src="./creator1.png" />
                </div>
            </div>
        </div>
    )
}

export default ProfileCarousel