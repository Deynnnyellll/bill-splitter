import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import BillSplitIcon from '../assets/images/bill-split.png'

import { GoArrowLeft } from "react-icons/go";
import { TiUserAdd } from "react-icons/ti";
import { RiEdit2Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const SendingReceipt = () => {
    const location = useLocation()
    const { positions, itemList } = location.state
    const receipt = itemList
    console.log(receipt)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let tax = 0

    const convertDate = (data) => {
      const year = data.split('T')[0].split('-')[0]
      const month = months[Number(data.split('T')[0].split('-')[1]) - 1]
      const day = data.split('T')[0].split('-')[2]

      return [day, month + ',', year].join(' ')
    }

    const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    if(positions) {
      axios
      .post('http://localhost:4000/bill', positions)
      .then(res => {
        console.log(res.data)
        setTimeout(() => {
          setIsSent(prevState => !prevState)
        }, 3000)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }, [])


  return (
    <div className={`bg-primaryThree text-lightOne ${isSent ? 'h-auto' : 'h-[110vh]'}`}>
      {receipt ? (
      <div className='mb-16'>
        <div className='flex justify-between items-center p-4'>
            <GoArrowLeft className='text-[18px]' />
            <h1 className='text-[14px]'>Your bill</h1>
            <TiUserAdd className='text-[18px]' />
        </div>
        {/* upper container */}
        <div className='bg-lightOne rounded-[20px] w-[95%] text-darkOne mx-auto p-4'>
            <div className='flex flex-col items-center justify-center'>
              <div>
                <img src={BillSplitIcon} alt="" className='w-[50%] max-w-[450px] mx-auto'/>
                <div className={`z-1 absolute top-[20%] ${isSent && 'bg-primaryOne bg-opacity-90 outline outline-1'} left-[50%] p-4 translate-x-[-50%] text-lightOne font-thin rounded-full`}>
                {isSent? <FaCheck size={60} /> : <AiOutlineLoading size={60} className='animate-spin'/>}
                </div>
              </div>

              <h1 className='text-[2em]'> {isSent ? "Split bill Success!" : "Please Wait"} </h1>
              <h2 className='text-primaryThree font-bold text-[1.9em]'> $ {isSent && receipt.totalAmount} </h2>
            </div>
        </div>
        {/* lower container */}
        {
        isSent ? 
        <>
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
              <p className='text-[#b7bac2]'>Transaction details</p>
            </div>
            {/* list of items */}
            <ul>
              {
                itemList.items.map(item => (
                  <li key={item.id}>
                    <h4 className='font-semibold'> {item.name} </h4>
                    <ul className='flex items-center justify-cente gap-1'>
                      {
                        positions.map(position => (
                          position.itemList.items.map(item1 => (
                            item1.name === item.name && item1.count !== 0 && (
                              <li key={item1.id} className='bg-primaryOne rounded-full text-lightOne px-2 py-1 w-6 h-6 text-sm text-center'>{position.name.charAt(0)}</li>
                            )
                          ))
                        ))
                      }
                    </ul>
                    <div className='flex items-center justify-between'>
                      <div className='text-primaryTwo'>
                        <p className='inline-block mr-4'> ${item.amount}</p>
                        <p className='inline-block'> {item.count}x </p>
                      </div>
                      <p> $ {item.amount * item.count} </p>
                    </div>
                  </li>
                ))
              }
            </ul>
            <hr className='mt-8'/>
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
          </div>
        </> : 
        <div className='bg-lightOne w-[95%] h-[350px] rounded-[20px] mx-auto mt-4 p-4 flex flex-col justify-between'>

          <div className='my-auto h-[90%] flex flex-col justify-between animate-pulse'>
            <div className='h-[25px] bg-gray-500 w-[90%]'></div>
            <div className='h-[25px] bg-gray-500 w-[98%]'></div>
            <div className='h-[25px] bg-gray-500 w-[60%]'></div>
            <div className='h-[25px] bg-gray-500 w-[50%]'></div>
            <div className='h-[25px] bg-gray-500 w-[80%]'></div>
          </div>

        </div>
        }
      </div>) : <p>loading..</p>}
    </div>
  )
}

export default SendingReceipt