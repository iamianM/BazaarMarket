import LoremIpsum from "react-lorem-ipsum"
import CreatorStats from "./CreatorStats"

function CreatorDescription() {
    return (
        <div className="bg-white bg-opacity-50 backdrop-blur-xl w-5/6 p-9 rounded-xl shadow-xl mt-10 mx-auto">
            <div className="flex flex-col text-center">
                <img src="/photo1.png" alt="profile"
                    className="w-48 h-48 border p-[3px] bg-base-100 rounded-full mx-auto" />
                <h2 className="font-bold font-poppins text-2xl mt-10">Creator</h2>
                <p>@creator</p>
            </div>
            <p className="text-justify mt-2"><LoremIpsum p={1} /></p>
            <div className="divider" />
            <div className="flex flex-col justify-center space-y-4">
                <CreatorStats type="likes" />
                <CreatorStats type="views" />
            </div>
            <div className="divider" />
            <div className="flex justify-between">
                {/* <SocialIcon url="https://twitter.com/" />
                        <SocialIcon url="https://www.instagram.com/" />
                        <SocialIcon url="https://www.facebook.com/" />
                        <SocialIcon url="https://www.youtube.com/" /> */}
            </div>
        </div>
    )
}

export default CreatorDescription