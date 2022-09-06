import React from 'react'
import CollectionTradeRow from './CollectionTradeRow'

function CollectionTrades() {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Trade</th>
                        <th>Actors</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    <CollectionTradeRow />
                    {/* <!-- row 2 --> */}
                    <CollectionTradeRow />
                    {/* <!-- row 3 --> */}
                    <CollectionTradeRow />
                    {/* <!-- row 4 --> */}
                    <CollectionTradeRow />
                </tbody>
                {/* <!-- foot --> */}
                <tfoot>
                    <tr>
                        <th>Item</th>
                        <th>Trade</th>
                        <th>Actors</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CollectionTrades
