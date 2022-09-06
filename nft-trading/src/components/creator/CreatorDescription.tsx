import LoremIpsum from "react-lorem-ipsum"
import CreatorStats from "./CreatorStats"
import { SocialIcon } from 'react-social-icons';

function CreatorDescription() {
    return (
        <div className="mt-32 mx-12 mb-10">
            <div className="card w-96 bg-white bg-opacity-50 backdrop-blur-xl shadow-xl">
                <div className="card-body">
                    <div className="flex flex-col text-center">
                        <h2 className="font-bold font-poppins text-2xl">Creator</h2>
                        <p className="mt-2">@creator</p>
                    </div>
                    <p><LoremIpsum p={1} /></p>
                    <div className="divider" />
                    <CreatorStats type="likes" />
                    <CreatorStats type="views" />
                    <div className="divider" />
                    <div className="flex justify-between">
                        <SocialIcon url="https://twitter.com/" />
                        <SocialIcon url="https://www.instagram.com/" />
                        <SocialIcon url="https://www.facebook.com/" />
                        <SocialIcon url="https://www.youtube.com/" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatorDescription