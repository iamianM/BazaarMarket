import { useState } from "react"


function ShowCard({ src }: { src: string }) {

    const [cardShowed, setCardShowed] = useState(false)

    return (
        <label className="swap swap-flip">
            <input type="checkbox" disabled={cardShowed} />
            <div className="swap-on" onClick={() => setCardShowed(true)} >
                <img src={src} className="h-64 w-36 object-fill rounded-md" />
            </div>
            <div className="swap-off">
                <img src="/cards/card-back.jpg" className="h-64 w-36 object-fill" />
            </div>
        </label>
    )
}

export default ShowCard
