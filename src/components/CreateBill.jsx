import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { TiUserAdd } from "react-icons/ti";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom'

import Additem from './AddItem';
import Items from './Items';
import EditItem from './EditItem';

const CreateBill = () => {
  const [itemLists, setItemLists] = useState([])
  const [title, setTitle] = useState('')
  const [addList, setAddlist] = useState(false)
  const [receipt, setReceipt] = useState({
    title: '',
    itemLists: null
  })
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('receipt', JSON.stringify(receipt))
  }, [receipt])

  const handleAddList = () => {
    setAddlist(prev => !prev)
  }

  const handleToggle = (id) => {
    setItemLists(itemLists.map((item) => (
      item.id === id ? { ...item, edited: !item.edited } : item
    )))
  }

  const handleAddItem = (item) => {
    setItemLists([...itemLists, { id: uuidv4(), name: item.name, amount: item.amount, count: item.count, edited: false }])
    setAddlist(prev => !prev)
  }

  const handleEditItem = (editedItem, id) => {
    setItemLists(itemLists.map((item) => (
      item.id === id ? { ...item, name: editedItem.name, amount: editedItem.amount, count: editedItem.count, edited: !item.edited } : item
    )))
  }

  const handleDeleteItem = (id) => {
    setItemLists(itemLists.filter((item) => item.id !== id))
  }

  const handleSaveReceipt = (event) => {
    event.preventDefault();
    setReceipt({
      title: title,
      itemLists: itemLists
    })
    setTimeout(() => {
      navigate('../receipt')
    }, 100)
  }

  return (
    <div className='text-lightOne'>
      <div className='flex justify-between items-center p-4'>
        <Link to={'..'}>
          <GoArrowLeft className='text-[18px]' />
        </Link>
        <h1 className='text-[14px]'>Create a bill</h1>
        <TiUserAdd className='text-[18px] text-darkOne' />
      </div>
      <div className='bg-darkTwo rounded-[20px] m-3 py-2 px-4'>
        <div className='items-center'>
          <input
            type="text"
            className='bg-transparent placeholder:italic placeholder:text-slate-400 outline-none w-full text-center'
            placeholder='Enter the title'
            onChange={(event) => setTitle(event.target.value)} />
        </div>
        {itemLists.map((item) => (
          item.edited === true ? (
            <EditItem
              key={item.id}
              item={item}
              toggleEditItem={handleEditItem}
              toggleEdit={handleToggle}
            />
          ) : (
            <Items
              key={item.id}
              id={item.id}
              name={item.name}
              amount={item.amount}
              count={item.count}
              toggleEdit={handleToggle}
              toggleDeleteItem={handleDeleteItem} />
          )
        ))}
        {addList === true ? (
          <Additem
            toggleAddItem={handleAddItem}
            setAddlist={setAddlist} />
        ) : (
          <button className='text-primaryThree mt-2 text-[12px]' onClick={handleAddList}>
            + Add item
          </button>
        )}
      </div>
      {title && itemLists.length !== 0 ? (
        <div className='mx-4 p-2 rounded-md bg-primaryThree text-center cursor-pointer select-none' onClick={handleSaveReceipt}>
          Next
        </div>
      ) : null}
    </div>
  )
}

export default CreateBill