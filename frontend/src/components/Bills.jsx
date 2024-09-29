import React, { useEffect, useState } from 'react'
// import { billLists } from '../constants'
import { CiReceipt } from "react-icons/ci";
import axios from "axios";
// import useFetch from '../custom hooks/useFetch';
import { useAuthContext } from '../custom hooks/useAuthContext';

const Bills = () => {
  const [receipts, setReceipts] = useState([])
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const { user } = useAuthContext()

  useEffect(() => {
    axios
      .get('http://localhost:4000/home', { headers: { 'Authorization': `Bearer ${user.token}` } })
      .then(res => {
        setReceipts(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const convertDate = (data) => {
    const year = data.split('T')[0].split('-')[0]
    const month = months[Number(data.split('T')[0].split('-')[1]) - 1]
    const day = data.split('T')[0].split('-')[2]

    return [day, month + ',', year].join(' ')
  }

  return (
    <div className='p-6'>
      <span className='flex justify-between items-center'>
        <p className='text-[14px]'>Recent bills</p>
        <p className='text-[12px] text-primaryThree cursor-pointer'>See all</p>
      </span>
      {receipts.length === 0 && (
        <div className='w-full my-4 text-center py-2'>
          <h1 className='text-[12px] italic'>Oh! you dont have recent bills, Add now!</h1>
        </div>
      )}
      <ul className='my-4 mb-[52px]'>
        {receipts.map((receipt) => (
          <li
            key={receipt._id}
            className='flex bg-darkTwo my-3 px-3 py-2 rounded-xl gap-2 items-center cursor-pointer'>
            <div className={`relative bg-white p-7 rounded-lg`}>
              <div className='absolute top-[13px] left-[14px] text-darkOne text-[28px]'>
                <CiReceipt />
              </div>
            </div>
            <div className='flex text-[9px] justify-between w-full'>
              <div>
                <h1 className='text-[15px] font-bold'>{receipt.title}</h1>
                <p className='text-gray-400'>{convertDate(receipt.updatedAt)}</p>
              </div>
              <div className='flex flex-col items-end'>
                <h1 className='text-[14px] font-light'>{`$${receipt.totalAmount}`}</h1>
                {/* <p className='text-gray-400'>{`${receipt.countPersons} persons`}</p> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bills