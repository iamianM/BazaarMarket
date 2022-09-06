import NFTHistoryRow from "./NFTHistoryRow"

function NFTHistory() {
    return (
        <div className="mt-10">
            <div className="flex flex-col space-y-4">
                <NFTHistoryRow />
                <div className="divider" />
                <NFTHistoryRow />
                <div className="divider" />
                <NFTHistoryRow />
                <div className="divider" />
                <NFTHistoryRow />
                <div className="divider" />
                <NFTHistoryRow />
            </div>
        </div>
    )
}

export default NFTHistory
