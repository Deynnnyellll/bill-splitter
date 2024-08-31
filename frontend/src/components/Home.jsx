import React from 'react'
import { Link } from 'react-router-dom'

import Bills from './Bills'

const Home = () => {
  return (
    <div className='text-lightOne cursor-default'>
      <div>
        <div className='bg-darkTwo p-6 rounded-b-[40px]'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-[12px]'>Hello, Margo ✌️</p>
              <h1 className='text-[26px]'>Split your bill</h1>
            </div>
            <div className='bg-darkThree rounded-full p-3 cursor-pointer'>
              icon
            </div>
          </div>
          <div className='bg-primaryThree w-full flex flex-col items-center p-8 mt-5 rounded-[26px] text-[14px]'>
            <p>Need to divide amount?</p>
            <Link to={'create-bill'} className='bg-darkOne py-2 px-4 rounded-xl mt-2  cursor-pointer'>Create your bill</Link>
          </div>
        </div>
      </div>
      <Bills />
    </div>
  )
}

export default Home