

function CreatorCard({ src }: { src: string }) {
    return (
        <div className="card card-normal w-96 shadow-xl">
            <div className="relative flex">
                <img src={src} className="rounded-xl " />
                <img src="./photo1.png" className="rounded-xl absolute top-48 left-[146px] h-24 w-24" />
            </div>
            <div className="card-body items-center text-center">
                <p>@Johanna</p>
                <h2 className="card-title">Lorem ipsum dolor sit amet</h2>
                <div className="card-actions">
                    <button className="btn btn-primary shadow-lg">Follow</button>
                </div>
            </div>
        </div>
    )
}

export default CreatorCard