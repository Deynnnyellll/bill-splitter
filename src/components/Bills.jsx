import React from 'react'
import { billLists } from '../constants'
import { CiReceipt } from "react-icons/ci";

const Bills = () => {
  return (
    <div className='p-6'>
      <span className='flex justify-between items-center'>
        <p className='text-[14px]'>Recent bills</p>
        <p className='text-[12px] text-primaryThree cursor-pointer'>See all</p>
      </span>
      <ul className='my-4 mb-[52px]'>
        {billLists.map((bill) => (
          <li
            key={bill.id}
            className='flex bg-darkTwo my-3 px-3 py-2 rounded-xl gap-2 items-center cursor-pointer'>
            <div className={`relative bg-[${bill.color}] p-7 rounded-lg`}>
              <div className='absolute top-[13px] left-[14px] text-darkOne text-[28px]'>
                <CiReceipt />
              </div>
            </div>
            <div className='flex text-[9px] justify-between w-full'>
              <div>
                <h1 className='text-[15px] font-bold'>{bill.title}</h1>
                <p className='text-gray-400'>{bill.date}</p>
              </div>
              <div className='flex flex-col items-end'>
                <h1 className='text-[14px] font-light'>{`$${bill.amount}`}</h1>
                <p className='text-gray-400'>{`${bill.count} persons`}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bills