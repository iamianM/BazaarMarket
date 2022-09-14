import { useState } from "react";
import ProfileCollection from "./ProfileCollection"
import { useQuery } from "react-query";
import type { Collection } from '../../../types'
import { Ring } from '@uiball/loaders'

function ProfileCollectionCarousel({ address }: { address: string | string[] | undefined }) {

    const { data: collections, isLoading, isFetching } = useQuery('collections', () => fetchCollections())
    const isDownloading = isLoading || isFetching

    async function fetchCollections() {
        const response = await fetch(`/api/profile/collections/${address}`)
        const fetchedCollections: Collection[] = await response.json()
        return fetchedCollections
    }

    return (
        <div className="lg:mt-10">
            <h1 className="font-bold text-3xl font-poppins">Collections</h1>
            <div className="carousel carousel-center max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mt-4 mx-auto p-4 space-x-8 bg-transparent ">
                {isDownloading ?
                    <div className="justify-center">
                        <Ring
                            size={40}
                            lineWeight={5}
                            speed={2}
                            color="black"
                        />
                    </div> :
                    collections?.map((collection, index) => (
                        <div className="carousel-item">
                            <ProfileCollection key={index} collection={collection} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ProfileCollectionCarousel
