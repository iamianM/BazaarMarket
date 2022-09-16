import { useState } from "react"
import { useRouter } from "next/router"
export default function SearchBar({ placeholder }: { placeholder: string }) {

    const [address, setAddress] = useState<string>("")
    const router = useRouter()

    return (
        <div className="bg-transparent rounded-md">
            <div className="inline-flex flex-col flex-start justify-center relative text-base-100">
                <div className="flex items-center">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        router.push(`/profile/${address}`)
                    }}>
                        <input type="text" className="p-5 pl-8 h-8 rounded-md bg-transparent border shadow-lg outline-none"
                            placeholder={placeholder}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </form>
                    <svg className="w-4 h-4 absolute left-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}