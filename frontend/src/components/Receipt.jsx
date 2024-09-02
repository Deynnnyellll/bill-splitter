import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { GoArrowLeft } from "react-icons/go";
import { TiUserAdd } from "react-icons/ti";
import { RiEdit2Fill } from "react-icons/ri";

const Receipt = () => {
  const [receipt, setReceipt] = useState(null)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const params = useParams()
  const receiptID = params.ID

  let tax = 0

  const convertDate = (data) => {
    const year = data.split('T')[0].split('-')[0]
    const month = months[Number(data.split('T')[0].split('-')[1]) - 1]
    const day = data.split('T')[0].split('-')[2]

    return [day, month + ',', year].join(' ')
  }

  useEffect(() => {
    console.log("here")
    axios
      .get(`http://localhost:4000/home/receipt/${receiptID}`)
      .then(res => {
        setReceipt(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='bg-primaryThree text-lightOne h-screen'>
      {receipt ? (<>
        <div className='flex justify-between items-center p-4'>
          <Link to={'/home'}>
            <GoArrowLeft className='text-[18px]' />
          </Link>
          <h1 className='text-[14px]'>Your bill</h1>
          <TiUserAdd className='text-[18px]' />
        </div>
        <div className='rounded-[20px] mx-3 mt-3 pt-4 px-5 bg-lightOne text-darkOne'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <div className='rounded-full py-3 px-4 bg-primaryOne font-semibold text-lightOne text-[14px]'>
                {receipt.title.charAt(0)}
              </div>
              <div>
                <h1 className='font-semibold text-[18px]'>{receipt.title}</h1>
                <p className='text-[#b7bac2] text-[12px]'>{convertDate(receipt.updatedAt)}</p>
              </div>
            </div>
            <div className='bg-slate-200 p-2 rounded-md'>
              <RiEdit2Fill className='text-primaryTwo' />
            </div>
          </div>
          <div className='mt-5 text-[12px]'>
            <p className='text-[#b7bac2]'>Transcaion details</p>
          </div>
          <ul>
            {receipt.items.map((item) => (
              <li key={item.id} className='flex justify-between items-end mt-2 pb-1 border-b-[1px] border-[#f3f3f3]'>
                <div>
                  <h1 className='text-[14px] font-semibold'>{item.name}</h1>
                  <div className='flex gap-2 items-center text-[12px] text-[#b7bac2]'>
                    <p>{`$ ${item.amount}`}</p>
                    <p>{`${item.count}x`}</p>
                  </div>
                </div>
                <h1 className='text-[13px] font-semibold'>{`$${(item.amount * item.count).toFixed(2)}`}</h1>
              </li>
            ))}
          </ul>
          <hr className='mt-8' />
        </div>
        <div className='relative rounded-t-[20px] mx-3 pt-4 pb-6 px-5 bg-lightOne text-darkOne ripped-paper'>
          <ul className='text-[12px] font-semibold'>
            <li className='flex justify-between'>
              <p className='text-[#b7bac2]'>Subtotal</p>
              <p>{`$${receipt.totalAmount.toFixed(2)}`}</p>
            </li>
            <li className='flex justify-between'>
              <p className='text-[#b7bac2]'>Tax</p>
              <p>{`${tax}%`}</p>
            </li>
            <li className='flex justify-between'>
              <p className='text-[#b7bac2]'>Total amount</p>
              <p className='text-[14px] text-primaryThree'>{`$${receipt.totalAmount.toFixed(2)}`}</p>
            </li>
          </ul>
          <Link to={'/home/select-friends'}>
            <div className='bg-darkOne text-lightOne mt-4 p-2 rounded-md text-center cursor-pointer w-full' >Split bill</div>
          </Link>

        </div>
      </>) : <p>loading..</p>}
    </div>
  )
}

export default Receipt