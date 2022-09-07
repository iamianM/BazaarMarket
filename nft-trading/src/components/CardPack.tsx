import { useState } from "react"
import ShowCard from "./ShowCard"

function CardPack() {

    return (
        <div className="hover:animate-tremble cursor-pointer">
            <img src="/cards/card-pack.jpeg" className="h-64 w-36 object-fill rounded-md" />
        </div>
    )
}

export default CardPack
