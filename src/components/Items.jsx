import React from 'react'
import { PiPencilSimpleLineThin, PiTrash } from "react-icons/pi";

const Items = ({ id, name, amount, count, toggleEdit, toggleDeleteItem }) => {
  return (
    <div className='border-b-[1px] border-[#2a2a2c]' key={id}>
      <div className='flex justify-between my-2'>
        <div>
          <h1 className='text-[14px]'>{name}</h1>
          <div className='flex gap-2 items-center text-[12px] text-[#b7bac2]'>
            <p>{`$ ${amount}`}</p>
            <p>{`x ${count}`}</p>
          </div>
        </div>
        <div className='flex items-center text-[18px] gap-2'>
            <div className='bg-darkOne p-1 rounded-lg cursor-pointer' onClick={() => toggleEdit(id)}>
              <PiPencilSimpleLineThin />
            </div>
            <div className='bg-red-600 p-1 rounded-lg cursor-pointer' onClick={() => toggleDeleteItem(id)}>
              <PiTrash />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Items