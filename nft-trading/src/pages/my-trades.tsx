import { useAccount } from "wagmi"
import { trpc } from "../utils/trpc";
import { v4 as uuidv4 } from 'uuid';
import TradeRow from "../components/trades/TradeRow";

function MyTradesPage() {

    const { address } = useAccount()
    const { data: makerSwaps } = trpc.useQuery(["swap.get-maker-swaps", {
        addressMaker: address!,
        closed: false,
    }]);

    const { data: takerSwaps } = trpc.useQuery(["swap.get-taker-swaps", {
        addressTaker: address!,
        closed: false,
    }]);

    return (
        <div className="min-h-screen max-w-7xl mx-auto flex flex-col space-y-4 justify-center items-center">
            {makerSwaps?.map((swap) => (
                <div key={uuidv4()}>
                    <TradeRow key={uuidv4()} swap={swap} />
                </div>
            ))}
            {takerSwaps?.map((swap) => (
                <div key={uuidv4()}>
                    <TradeRow key={uuidv4()} swap={swap} />
                </div>
            ))}
        </div>
    )
}

export default MyTradesPage