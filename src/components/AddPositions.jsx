import guyProfile from '/src/assets/images/boy icon.png';
import girlProfile from '/src/assets/images/girl icon.png';
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { TiUserAdd } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'

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

    const [option, setOption] = useState(false);

    const toggleOption = () => {
        setOption(!option);
    }

    const increment = (id, num) => {
        setCount(count.map(item => (
            {...item,
            items: item.items.map(item => (item.id === id ? {...item, num: num+1} : item))}
        )))
    }

    const decrement = (id, num) => {
        if(num > 0) {
            setCount(count.map(item => (
                {...item,
                    items: item.items.map(item => (item.id === id ? {...item, num: num-1} : item))
                }
            )))
        }
    }

    useEffect(()=> {
        setCount(userBills.map((user) => (
            {...user, 
                items: user.items.map(user => ({...user, num: 0, id: uuidv4()}))
            }
        )))
        console.log("Record changed")
    }, [])

    useEffect(() => {
        console.log(count)
    }, [count])

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
                            option ? 
                            <RiDeleteBin6Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree'/>
                            :
                            <RiEdit2Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree'  onClick={toggleOption}/>
                        }
                    </div>

                    {/* Item Container */}
                    {
                        user.items.map((item, index) => (
                            <div key={index} className='flex flex-col gap-1 mb-4'> 
                                <h1> {item.itemName} </h1>
                                <div className='flex justify-between text-xs font-light'>
                                    <div className='flex gap-6 text-lightFour'>
                                        <p> ${item.price} </p>
                                        <p> {item.count}x </p>
                                    </div>
                                    {
                                    option ?
                                        <h4> ${item.price * item.count} </h4>
                                        :
                                        <div className='flex items-center gap-2'> 
                                            <button onClick={() => decrement(item.id, item.num)}> - </button>
                                            <p> {item.num} </p>
                                            <button onClick={() => increment(item.id, item.num)}> + </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>
  )
}

export default AddPositions