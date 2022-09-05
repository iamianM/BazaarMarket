import React from 'react'

function FAQRow({ tabIndex }: { tabIndex: number }) {
    return (
        <div tabIndex={tabIndex} className="collapse collapse-arrow border border-base-300 bg-transparent outline-none">
            <div className="collapse-title text-xl font-medium">
                Lorem ipsum?
            </div>
            <div className="collapse-content">
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        </div>
    )
}

export default FAQRow