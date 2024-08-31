import React, { useState } from 'react'
import { GoCheck, GoX } from "react-icons/go";

const EditItem = ({ item, toggleEditItem, toggleEdit }) => {
  const [name, setName] = useState(item.name)
  const [amount, setAmount] = useState(item.amount)
  const [count, setCount] = useState(item.count)

  const styleInput = 'bg-transparent placeholder:italic placeholder:text-slate-400 outline-none w-[120px]'

  const handleSubmit = (event) => {
    event.preventDefault()

    toggleEditItem({ name, amount, count }, item.id)

    setName('')
    setAmount(null)
    setCount(null)
  }

  return (
    <div className='mt-3 pt-2 border-b-[1px] border-[#2a2a2c]'>
      <form className='flex justify-between items-center' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 grid-flow-row gap-2 my-2'>
          <div className='col-span-2 bg-darkOne p-2 text-[14px] rounded-md'>
            <input type='text' placeholder='Item name' value={name} className={`${styleInput}`} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div className='flex items-center bg-darkOne rounded-md'>
            <span className='px-2 text-slate-400'>$</span>
            <input type='number' min='0.01' step='0.01' placeholder='Amount' value={amount} className={`text-[12px] ${styleInput}`} onChange={(event) => setAmount(event.target.value)} required />
          </div>
          <div className='flex items-center bg-darkOne rounded-md'>
            <span className='px-2 text-slate-400'>x</span>
            <input type='number' min='1' placeholder='Count' value={count} className={`text-[12px] ${styleInput}`} onChange={(event) => setCount(event.target.value)} required />
          </div>
        </div>
        <div className='flex flex-col gap-2 text-[18px]'>
          <button type='submit' className='bg-darkOne ms-4 p-1 rounded-lg cursor-pointer'>
            <GoCheck />
          </button>
          <div className='bg-darkOne ms-4 p-1 rounded-lg cursor-pointer' onClick={() => toggleEdit(item.id)}>
            <GoX />
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditItem