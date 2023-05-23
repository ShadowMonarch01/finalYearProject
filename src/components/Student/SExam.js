import React,{useState, useEffect, useContext, useRef} from 'react'
import './Student.css'
import CountdownTimer from '../CountdownTimer'
import {PadData} from '../PData'
import { AuthContext } from '../../theAuth/context'

const SExam = () => {

    const inputRef = useRef(null);

    const [tData, setTData] = useState([])
    // const [todosPerPage, setTodosPerPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const {studentName,matNo} = useContext(AuthContext)

    const numOfTotalPages = Math.ceil(tData.length/1)
    const pages = [...Array(numOfTotalPages+1).keys()].slice(1);

    const indexOfLastQusetion = currentPage * 1;
    const indexOfFirstQuestion = indexOfLastQusetion - 1;

    const visibleQuestion = tData.slice(indexOfFirstQuestion,indexOfLastQusetion);

    useEffect(()=>{
        setTData([...PadData])
    },[])

    const prevHandler =()=>{
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }

    const nextHandler =()=>{
        if(currentPage !== numOfTotalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const handleInputChange = (event,idx) => {
        // const value = event;

        let tempData = [...tData];
        tData[idx].answer = event
        setTData(tempData);

        console.log("Temp Data")
        console.log(tempData)

        console.log("Set Data")
        console.log(tData)
        };
        
  return (
    <div className='eXcontainer'>
        <div className='header pt-3 justify-between'>
            
            <div className='flex flex-row'>
                <div className='mx-10 text-2xl text-white'>
                    <p>{studentName}</p>
                    <p>{matNo}</p>
                </div>

                <div className='mx-10 text-2xl text-white'>
                    <p>Course</p>
                </div>
            </div>

            <div className='mr-10'>
                <CountdownTimer timeLimit={800}/>
            </div>
        </div>

        <div className='body'>

            {/* <div className='flex flex-row w-full'> */}
                <div className=' flex items-center mr-8'>
                    <button 
                     className='bg-blue-400 w-16 h-16 rounded-full text-white' 
                     onClick={prevHandler}
                     
                     docume
                    >
                        <h1>{`<`}</h1>
                    </button>
                </div>


                    {
                        visibleQuestion.map((question1,index)=>(
                            <div className='qContainer flex flex-col items-center' key={index}>
                                <div className='bg-white w-4/5 mt-4 p-2 h-44 overflow-y-scroll'>
                                    {
                                        <p>{question1.question}</p>
                                    }
                                </div>

                                <div className='bg-white w-4/5 h-1/4 mt-4'>
                                    <textarea 
                                        onInput={(e)=>handleInputChange(e.target.value,index)} 
                                        placeholder='Answer' className='p-1 w-full' rows={5}
                                        name='answer'
                                        id='answer'
                                        value={question1.answer}
                                        // ref={inputRef}
                                        >
                                    </textarea>
                                </div>
                            </div>
                        ))
                    }


                <div className=' flex items-center ml-8'>
                    <button 
                     className='bg-blue-400 w-16 h-16 rounded-full text-white'
                     onClick={nextHandler}
                    >
                        <h1 className=''>{`>`}</h1>
                    </button>
                </div>
            {/* </div> */}
            
        </div>

        <div className='footer flex justify-center'>
            {/* Footer */}
            
         <div className='paginationWidth mt-2'>
            <nav className='block'>
                <ul className='flex pl-0 rounded list-none flex-wrap'>
                    <li>
                        {pages.map((page,index) => (
                        <span
                            key={index}
                            onClick={() => {
                                setCurrentPage(page);
                            }}
                            // href='#'
                            className={
                            currentPage === page
                                ? "bg-blue-400 border-red-300 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium pgBtnSpacing"
                            }
                        >
                            {page}
                        </span>
                        ))}
                    </li>
                </ul>
            </nav>
         </div>
            
        </div>
    </div>
  )
}

export default SExam;