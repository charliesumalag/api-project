import React from 'react'

const Button = ({ text, onClick })  => {
  return (
    <div className='text-right'>
            <button onClick={onclick} className='text-[#999] border border-[#777] px-10 py-1 rounded-md hover:bg-white hover:text-[#0F172A] transition-all duration-300 ease-in-out'>{text}</button>
        </div>
  )
}

export default Button
