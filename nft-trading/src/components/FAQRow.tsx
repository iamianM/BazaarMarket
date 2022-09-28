import React from 'react'

function FAQRow({ tabIndex, question, answer }: { tabIndex: number, question: string, answer: string }) {
    return (
        <div tabIndex={tabIndex} className="collapse collapse-arrow border border-base-300 bg-transparent outline-none">
            <div className="collapse-title text-xl font-medium">
                <p className='font-poppins'>{question}</p>
            </div>
            <div className="collapse-content">
                <p className='font-poppins'>{answer}</p>
            </div>
        </div>
    )
}

export default FAQRow