import React from 'react'
import CollectionTradeRow from './CollectionTradeRow'

function CollectionTrades() {
    return (
        <div className="overflow-x-auto w-auto">
            <table className="table table-normal">
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
                    <CollectionTradeRow />
                    <CollectionTradeRow />
                    <CollectionTradeRow />
                    <CollectionTradeRow />
                </tbody>
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
