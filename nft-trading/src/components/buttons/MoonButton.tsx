import React from 'react'

function MoonButton({ text }: { text: string }) {
    return (
        <div className='shadow-2xl cursor-pointer flex justify-center items-center rounded-full w-32 h-32 bg-gradient-to-bl from-white via-yellow-200 to-secondary'>
            <p className='font-poppins text-lg'>{text}</p>
        </div>
    )
}

export default MoonButton
