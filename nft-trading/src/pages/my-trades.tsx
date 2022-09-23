import { useAccount } from "wagmi"
import { trpc } from "../utils/trpc";
import { v4 as uuidv4 } from 'uuid';
import TradeRow from "../components/trades/TradeRow";
import { PaperAirplaneIcon, ArrowCircleDownIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/outline"
import { useState } from "react"

function MyTradesPage() {

    const { address } = useAccount()
    const [selectedTab, setSelectedTab] = useState("sent")

    const { data: makerSwaps } = trpc.useQuery(["swap.get-maker-swaps", {
        addressMaker: address!,
        closed: false,
    }]);

    const { data: takerSwaps } = trpc.useQuery(["swap.get-taker-swaps", {
        addressTaker: address!,
        closed: false,
    }]);

    return (
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col space-y-4 py-36">
            <ul className="menu menu-vertical lg:menu-horizontal border-b-2 ">
                <li><a>
                    <div className="flex items-center space-x-2" onClick={() => setSelectedTab("sent")}>
                        <PaperAirplaneIcon className="h-5 w-5" />
                        <p className="font-poppins">Sent</p>
                    </div>
                </a></li>
                <li><a>
                    <div className="flex items-center space-x-2" onClick={() => setSelectedTab("requested")}>
                        <ArrowCircleDownIcon className="h-5 w-5" />
                        <p className="font-poppins">Requested</p>
                    </div>
                </a></li>
                <li><a>
                    <div className="flex items-center space-x-2" onClick={() => setSelectedTab("accepted")}>
                        <CheckCircleIcon className="h-5 w-5" />
                        <p className="font-poppins">Accepted</p>
                    </div>
                </a></li>
                <li><a>
                    <div className="flex items-center space-x-2" onClick={() => setSelectedTab("declined")}>
                        <XCircleIcon className="h-5 w-5" />
                        <p className="font-poppins">Declined</p>
                    </div>
                </a></li>
            </ul>
            {selectedTab === "sent" &&
                makerSwaps?.map((swap) => (
                    <div key={uuidv4()}>
                        <TradeRow key={uuidv4()} swap={swap} />
                    </div>
                ))}
            {selectedTab === "requested" &&
                takerSwaps?.map((swap) => (
                    <div key={uuidv4()}>
                        <TradeRow key={uuidv4()} swap={swap} />
                    </div>
                ))}
        </div>
    )
}

export default MyTradesPage