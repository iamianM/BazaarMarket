import Link from "next/link"

function ProfileCard({ src, name }: { src: string, name: string }) {
    return (
        <Link href={"/profile/0x4bbb41F61fFfc1Bbe65a2aa192C65281E16eA758"}>
            <div className="card card-normal w-96 shadow-xl cursor-pointer">
                <div className="relative flex">
                    <img src="./creator1.png" className="rounded-xl" />
                    <img src={src} className="rounded-xl absolute top-48 left-[146px] h-24 w-24" />
                </div>
                <div className="card-body items-center text-center">
                    <p className="font-poppins">@{name}</p>
                    <h2 className="card-title">Lorem ipsum dolor sit amet</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary shadow-lg">Follow</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProfileCard