import CreatorStats from "./ProfileStats"

function ProfileDescription() {
    return (
        <div className="bg-transparent p-4 mx-auto">
            <div className="flex flex-col text-center">
                <h2 className="font-bold font-poppins text-2xl">Profile</h2>
                <p>@user</p>
            </div>
            <p className="text-justify mt-2">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Sapien sapien cursus inceptos ligula purus porta. Neque dolor risus aenean dictumst maecenas odio praesent fusce duis? Finibus elit velit volutpat imperdiet aenean ultrices eget donec. Augue vitae mus enim ultrices parturient eget ridiculus efficitur urna. Ornare platea taciti primis vivamus erat. Himenaeos bibendum curabitur vehicula taciti habitasse rutrum. Nisl venenatis per habitasse hendrerit arcu magnis.
            </p>
            <div className="divider" />
            <div className="flex justify-evenly space-x-4">
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

export default ProfileDescription