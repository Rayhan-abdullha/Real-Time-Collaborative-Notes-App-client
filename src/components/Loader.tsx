import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-[75vh]'>
      <div className="w-7 h-7 animate-[ping_2s_linear_infinite] rounded-full border-2 border-[#5f27cd] flex items-center justify-center">
        <div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] rounded-full border-2 border-[#5f27cd]"></div>
      </div>
    </div>
  )
}

export default Loader