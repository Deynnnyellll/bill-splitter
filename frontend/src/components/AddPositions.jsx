import guyProfile from '/src/assets/images/boy icon.png';
// import girlProfile from '/src/assets/images/girl icon.png';
import { RiDeleteBin6Fill, RiEdit2Fill } from "react-icons/ri";
import { GoArrowLeft } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const AddPositions = () => {
    // props should be an array of objects
    const location = useLocation();
    const items = location.state;
    const [positions, setPositions] = useState();
    const [prep, setPrep] = useState();
    const [option, setOption] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [globalItem, setGlobalItem] = useState();
    const [originalPos, setOriginalPos] = useState();
    const [nothing, setNothing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getData();
        console.log(originalPos);
        if(prep === true){
            assignTotalCount();
        }

        if(!totalCount && positions) {
            setTotalCount(positions[0].itemList.totalCount);
        }

    }, [positions])

    async function getData() {
        if(!positions) {
            try {
                const data = await axios.get("http://localhost:4000/home");
                const currentData = data.data[0];
                setGlobalItem(currentData.items.map(item => ({...item, origCount: item.count})));
                setPositions(items.map(item => (
                    {...item, itemList: currentData}
                )));
                setOriginalPos(currentData);
                setPrep(true);
            }
            catch(err) {
                console.error(err)
            }
        }
    }

    function assignTotalCount () {
        if(positions) {
            setPositions(positions.map(position => (
                {...position, 
                    itemList: {
                        ...position.itemList, totalCount: position.itemList.items.reduce((acc, item) => parseInt(acc) + parseInt(item.count), 0),
                        items: position.itemList.items.map(item => (
                            {...item, count: 0}
                        ))
                    }
                }
            )))

            setOption(positions.map(() => true))

            setPrep(false)
        }
    }


    function toggleOption(index) {
        setOption(option.map((option, i) => (i === index ? !option : option)))
    }


    function handleIncrementDecrement(id, name, method, number) {
        try {
            const globalObj = handleGlobal(method, name);
            console.log(globalObj.count);
            console.log(globalObj.origCount);
            setPositions(positions.map(position => (position.id === id ?
                {...position, 
                    itemList: {...position.itemList, items: position.itemList.items.map(item => (
                        item.name === name 
                        ? {...item, 
                                count: method === "add" 
                                ? (globalObj.count > 0 ? parseInt(number) + 1 : item.count) 
                                : (globalObj.count < globalObj.origCount ? parseInt(number) - 1 : item.count)  
                            } 
                        : item
                    ))}
                } : position
            )))
            

            console.log(positions);
        }
        catch(err) {
            console.error(err);
        }
    }

    function handleGlobal(method, name) {
        setGlobalItem(globalItem.map(item => (item.name === name 
            ?   {...item, count: method === "add" 
                    ? (item.count > 0 ? item.count - 1 : item.count) 
                    : (item.origCount > item.count ? parseInt(item.count) + 1 : item.count)
                } 
            : item)));

        const globalObj = globalItem.find(item => item.name === name);
        setNothing(!nothing);

        return globalObj;
    }

    function handleDelete(id) {
        setPositions(positions.filter(position => position.id !== id));
        setOption(positions.map(() => true));
        console.log(positions)
    }

    function makeAReceipt() {
        navigate('sending-receipt', { state: {positions: positions, itemList: positions[0].itemList, originalItems: originalPos} });
    }

  return (
    <div>
    {positions ? 
        <div className="text-white w-full flex flex-col items-center">
            {/* header */}
            <div className='flex justify-between items-center w-[95%] my-6'>
                <GoArrowLeft  className='text-[18px]' onClick={() => navigate(-1)}/>
                <h1> Add Positions </h1>
                <TiUserAdd className='text-[18px]'/>
            </div>
            {
                positions.map((user, index) => (
                    <div key={user.id} className='bg-darkTwo flex flex-col w-[95%] rounded-2xl p-6 justify-between mb-8'> 
                        <div className='flex justify-between mb-8'>
                            <div className='flex gap-4'>
                                {/* image */}
                                <img src={guyProfile} alt="profile icon"  className='w-[40px] h-[40px]'/>
                                {/* add positions to member */}
                                <h3 className='leading-tight'>
                                    Add positions to <br /> {user.name}
                                </h3>                
                            </div>
                            {/* del button/edit button */}
                            {
                                !option[index] ? 
                                <RiDeleteBin6Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree' onClick={() => handleDelete(user.id)}/>
                                :
                                <RiEdit2Fill size={30} className='p-2 bg-darkThree rounded-lg text-lightThree'  onClick={() => toggleOption(index)}/>
                            }
                        </div>

                        {/* Item Container */}
                        { user &&
                            user.itemList.items.map(item => (
                                <div key={item.id} 
                                    className={`flex flex-col gap-1 mb-4 ${!option[index] && `border-b-2 border-lightThree border-opacity-10`} py-1`}> 
                                    <h1> {item.name} </h1>
                                    <div className='flex justify-between text-xs font-light'>
                                        <div className='flex gap-6 text-lightFour'>
                                            <p> ${item.amount} </p>
                                            <p> {item.count}x </p>
                                        </div>
                                        {
                                        option[index] ?
                                            <h4> ${item.amount * item.count} </h4>
                                            :
                                            <div className='flex items-center gap-2 bg-darkOne py-1 px-2 rounded-md'> 
                                                <button onClick={() => handleIncrementDecrement(user.id, item.name, "minus", item.count)}> - </button>
                                                <p> {item.count} </p>
                                                <button onClick={() => handleIncrementDecrement(user.id, item.name, "add", item.count)}> + </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {
                            !option[index] && 
                            <div className='flex flex-col items-start'> 
                                <button className='bg-transparent text-primaryThree'> + Add position</button>
                                <div className='flex items-center justify-between w-full'>
                                    <button 
                                    className='bg-primaryThree py-2 px-6 rounded-xl hover:bg-blue-600 duration-200 ease-in-out mt-4'
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
            <button className='w-[95%] bg-primaryThree p-2 rounded-lg mb-16' onClick={makeAReceipt}> Next </button>
        </div>
        :
        <div className='text-white'> 
            <h1> No Items </h1>
        </div>
    }
    </div>
    
  )
}

export default AddPositions