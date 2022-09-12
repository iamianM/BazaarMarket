

function SearchNFT() {
    return (
        <div className="bg-transparent border rounded-md p-1 w-full">
            <div className="inline-flex flex-col flex-start justify-center relative text-base-100">
                <div className="flex items-center">
                    <input type="text" className="placeholder:text-base-100 placeholder:italic p-5 pl-8 h-8 bg-transparent outline-none"
                        placeholder="Search NFT..." />
                    <svg className="w-4 h-4 absolute left-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SearchNFT
