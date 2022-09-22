import NFTHistoryRow from "./NFTHistoryRow"

function NFTHistory({ owner }: { owner: string | any }) {
    return (
        <div className="mt-10">
            <div className="flex flex-col space-y-4">
                <NFTHistoryRow owner={owner} />
                <div className="divider" />
                <NFTHistoryRow owner={owner} />
                <div className="divider" />
                <NFTHistoryRow owner={owner} />
                <div className="divider" />
                <NFTHistoryRow owner={owner} />
                <div className="divider" />
                <NFTHistoryRow owner={owner} />
            </div>
        </div>
    )
}

export default NFTHistory
