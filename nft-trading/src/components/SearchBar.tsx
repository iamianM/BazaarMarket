
export default function SearchBar({ placeholder }: { placeholder: string }) {

    return (
        <div className="bg-transparent rounded-md">
            <div className="inline-flex flex-col flex-start justify-center relative text-inherit">
                <div className="flex items-center">
                    <input type="text" className="p-5 pl-8 h-8 rounded-md bg-transparent text-inherit shadow-lg outline-none"
                        placeholder={placeholder} />
                    <svg className="w-4 h-4 absolute left-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}