
function ProfileBanner() {
    return (
        <>
            <img src="/banner.jpeg" alt="collection_banner" className="w-full inset-x-0 h-96 object-cover" />
            <div className="avatar flex -top-24 items-center justify-center">
                <div className="w-48 z-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img src="/photo1.png" />
                </div>
            </div>
        </>
    )
}

export default ProfileBanner