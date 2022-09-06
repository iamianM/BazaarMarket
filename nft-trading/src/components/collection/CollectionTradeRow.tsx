import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/outline'

function CollectionTradeRow() {
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src="/imaginary_ones.jpeg" alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">Imaginary Ones</div>
                        <div className="text-sm opacity-50">#4496</div>
                    </div>
                </div>
            </td>
            <td>
                <div className='flex items-center space-x-2'>
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/imaginary_ones.jpeg" alt="Avatar Tailwind CSS Component" />
                    </div>
                    <ArrowRightIcon className='h-6' />
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/imaginary_ones.jpeg" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <p>cro1qj75rh6554ne....czwyx4v7su7</p>
                    <p>cro1pn68w4ze....hrkyezuj8j2dmn9</p>
                </div>
            </td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    )
}

export default CollectionTradeRow
