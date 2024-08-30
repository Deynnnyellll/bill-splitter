import guyProfile from '/src/assets/images/boy icon.png';
import girlProfile from '/src/assets/images/girl icon.png';
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFetch from '../custom hooks/useFetch';

const AddPositions = () => {
    // props should be an array of objects
    const [count, setCount] = useState([]);
    const userBills = [
        {
            name: "Alex Clare",
            gender: "male",
            items:
            [
            {
                itemName: "Cold Latte",
                price: 300,
                count: 3,
            },
            ]
        },
        {
            name: "Mikha Lim",
            gender: "female",
            items:
            [
            {
                itemName: "Cold Latte",
                price: 300,
                count: 1,
                                                                
            },
            {
                itemName: "Burger",
                price: 25,
                count: 2,

            }
            ],
        },
    ]

    const [option, setOption] = useState([]);


    const toggleOption = (index) => {
        setOption(option.map((option, i) => (i === index ? !option : option)))
    }

    const handleCount = (id, num, method) => {
        if(method === "add") {
            setCount(count.map(item => (
                {
                    ...item,
                    items: item.items.map(item => (item.id === id ? {
                        ...item,
                        num: item.count > num ? num + 1 : num
                    } : item)),
                    totalCount: item.items.reduce((acc, item) => acc + item.num, 0)
                }
            )))
        }
        else {
            setCount(count.map(item => (
                {
                    ...item,
                    items: item.items.map(item => (item.id === id ? {
                        ...item,
                        num: num > 0 ? num - 1 : num
                    } : item)),
                    totalCount: item.items.reduce((acc, item) => acc + item.num, 0)
                }
            )))
        }
    }

    useEffect(()=> {
        setCount(userBills.map((user) => (
            {...user,
                items: user.items.map(item => ({...item, num: item.count, id: uuidv4(),
                })), totalCount: user.items.reduce((acc, item) => acc + item.count, 0)
            }
        )))

        setOption(userBills.map(() => true))
    }, [])

    // custom hook
    const { data, getData } = useFetch();

    function consoleData(url) {
        getData(url);
        console.log(data)
    }

  return (
    <div className="text-white w-full flex flex-col items-center">
        {/* header */}
        <div className='flex justify-between items-center w-[95%] my-6'>
            <GoArrowLeft  className='text-[18px]'/>
            <h1> Add Positions </h1>
            <TiUserAdd className='text-[18px]'/>
        </div>
        {
            count.map((user, index) => (
                <div key={index} className='bg-darkTwo flex flex-col w-[95%] rounded-2xl p-6 justify-between mb-8'> 
                    <div className='flex justify-between mb-8'>
                        <div className='flex gap-4'>
                            {/* image */}
                            <img src={user.gender === 'male' ? guyProfile : girlProfile} alt="profile icon"  className='w-[40px] h-[40px]'/>
                            {/* add positions to member */}
                            <h3 className='leading-tight'>
                                Add positions to <br /> {user.name}
                            </h3>                
                        </div>
                        {/* del button/edit button */}
                        {
                            !option[index] ? 
                            <RiDeleteBin6Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree'/>
                            :
                            <RiEdit2Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree'  onClick={() => toggleOption(index)}/>
                        }
                    </div>

                    {/* Item Container */}
                    {
                        user.items.map(item => (
                            <div key={item.id} 
                                className={`flex flex-col gap-1 mb-4 ${!option[index] && `border-b-2 border-lightThree border-opacity-10`} py-1`}> 
                                <h1> {item.itemName} </h1>
                                <div className='flex justify-between text-xs font-light'>
                                    <div className='flex gap-6 text-lightFour'>
                                        <p> ${item.price} </p>
                                        <p> {item.count}x </p>
                                    </div>
                                    {
                                    option[index] ?
                                        <h4> ${item.price * item.num} </h4>
                                        :
                                        <div className='flex items-center gap-2 bg-darkOne py-1 px-2 rounded-md'> 
                                            <button onClick={() => handleCount(item.id, item.num, "minus")}> - </button>
                                            <p> {item.num} </p>
                                            <button onClick={() => handleCount(item.id, item.num, "add")}> + </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                    {
                        !option[index] && 
                        <div className='flex flex-col items-start'> 
                            <button className='bg-transparent text-primaryThree' onClick={() => consoleData('https://randomuser.me/api/')}> + Add position</button>
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-sm'> Add {user.totalCount} selected items to the bill </p>
                                <button 
                                className='bg-primaryThree py-2 px-6 rounded-xl hover:bg-blue-600 duration-200 ease-in-out'
                                onClick={() => toggleOption(index)}
                                > 
                                <FaCheck /> 
                                </button>
                            </div>
                        </div>
                    }
                </div>
            ))
        }
    </div>
  )
}

export default AddPositions