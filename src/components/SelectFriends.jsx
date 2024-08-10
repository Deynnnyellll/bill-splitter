import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoArrowLeft, GoX, GoSearch } from "react-icons/go";
import { TiUserAdd } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

import { friends } from '../constants'

export const Circle = ({ friend, toggleAdded }) => {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='bg-lightOne text-darkOne rounded-full h-12 w-12 flex justify-center items-center relative'>
        {friend.name.charAt(0)}
        <div className='absolute bg-lightFour -top-1 -right-1 rounded-full text-darkOne font-bold p-1 cursor-pointer' onClick={() => toggleAdded(friend.id)}>
          <GoX className='text-[12px]' />
        </div>
      </div>
      <p className='text-[12px]'>{friend.name}</p>
    </div>
  )
}

export const FriendTab = ({ friend, toggleAdded }) => {
  return (
    <div className='flex justify-between items-center my-4 text-lightOne'>
      <div className='flex items-center gap-4'>
        <div className='bg-darkTwo rounded-full h-12 w-12 flex justify-center items-center relative'>
          {friend.name.charAt(0)}
        </div>
        <h1>{friend.name}</h1>
      </div>
      <div className={`flex justify-center items-center ${friend.added ? 'bg-primaryThree text-darkOne' : 'bg-[#b5b6b969]'} rounded-full h-4 w-4 cursor-pointer`} onClick={() => toggleAdded(friend.id)}>
        {friend.added ? (
          <FaCheck className='text-[9px]' />
        ) : null}
      </div>
    </div>
  )
}

const SelectFriends = () => {
  const [friendList, setFriendsList] = useState(friends)
  const [inputSearch, setInputSearch] = useState('')

  const handleAddFriend = (id) => {
    setFriendsList(friendList.map((friend) => (
      friend.id === id ? { ...friend, added: !friend.added } : friend
    )))
  }

  return (
    <div>
      <div className='text-lightOne bg-darkTwo rounded-b-[40px]'>
        <div className='flex justify-between items-center p-4'>
          <Link to={'..'}>
            <GoArrowLeft className='text-[18px]' />
          </Link>
          <h1 className='text-[14px]'>Select your friends</h1>
          <TiUserAdd className='text-[18px]' />
        </div>
        <div className='pt-3 pb-6 px-6'>
          <div className='bg-primaryThree py-4 px-6 rounded-[26px] text-[14px] tansition ease-in-out'>
            <p>Send to</p>
            <ul className='flex items-start gap-3 overflow-y-auto'>
              {friendList.map((friend) => (
                friend.added && (
                  <li key={friend.id} className='pt-4 pb-2'>
                    <Circle
                      friend={friend}
                      toggleAdded={handleAddFriend} />
                  </li>)
              ))}
              <li className='pt-4 pb-2'>
                <div className='bg-lightOne text-[#b7bac2] text-[18px] rounded-full h-12 w-12 flex justify-center items-center relative'>
                  +
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='px-6 pb-6 pt-4'>
        <span className='flex flex-col gap-2'>
          <p className='text-[14px] text-[#b5b6b969]'>Contacts</p>
          <div className='flex items-center gap-2 py-2 text-lightOne border-b-[1px] border-[#2a2a2c]'>
            <GoSearch className='text-[20px]' />
            <input type="text" placeholder='Find friends' className='bg-transparent text-[14px] outline-none' onChange={(event) => setInputSearch(event.target.value)} />
          </div>
        </span>
        <ul className='py-2 mb-10'>
          {friendList.filter((friend) => {
            return inputSearch.toLowerCase() === '' ? 
              friend :
              friend.name.toLowerCase().includes(inputSearch.toLowerCase())
          }).map((friend) => (
              <li key={friend.id}>
                <FriendTab
                  friend={friend}
                  toggleAdded={handleAddFriend}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SelectFriends