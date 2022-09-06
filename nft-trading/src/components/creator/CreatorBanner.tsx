
function CreatorBanner() {
    return (
        <div className="relative">
            <img src="/banner.jpeg" alt="banner" className="w-full h-96 object-cover" />
            <img src="/photo1.png" alt="profile"
                className="w-48 h-48 border p-[3px] bg-base-100 rounded-full top-72 left-36 absolute" />
        </div>
    )
}

export default CreatorBanner