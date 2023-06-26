import React from 'react'
import '../../Admin.css'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
const ExamScript =()=> {
  return (
    <div className='viewScreen'>
      <div className='bg-red-200 w-screen'>

        <div className='scriptsTop'>
          <div>
            <p>Name: Trust Gunn</p>
          </div>

          <div>
            <p>Mat_N0: UG/17/####</p>
          </div>

          <div>
            <p>Course: Web Designs</p>
          </div>

          <div>
            <p>Course_Code: EEE 501</p>
          </div>
        </div>

        <div className='flex'>
          
          <div className='flex-col flex-1'>
            <p className='cardTitle'>Question</p>

            <div className='rectangle4'></div>
          </div>

          <div className='flex-col flex-1'>
            <p className='cardTitle'>Answer</p>

            <div className='rectangle4'></div>
          </div>

          <div className='flex-col flex-1'>
            <p className='cardTitle'>Student Answer</p>

            <div className='rectangle4'></div>
          </div>
        </div>

        <div className='flex mt-4 justify-end pr-16'>

          <div className='flex items-center'>
            <p className='text-black text-2xl'>Correct</p>
            <input type="checkbox" className='bg-gray-400 w-10 h-16 mr-3 ml-3 rounded-xl'/>
          </div>

          <div className='flex items-center'>
            <p className='text-black text-2xl'>InCorrect</p>
            <input type="checkbox" className='bg-gray-400 w-10 h-16 mr-3 ml-3 rounded-xl'/>
          </div>
          
        </div>

        <div className='flex justify-center'>
          <button className='bg-gray-400 w-16 h-14 mr-3 rounded-xl flex items-center justify-center'>
            <FaChevronLeft size={30}/>
          </button>

          <button className='bg-gray-400 w-16 h-14 ml-3 rounded-xl flex items-center justify-center'>
            <FaChevronRight size={30}/>
          </button>
        </div>


        {/* <div className='bg-slate-500 w-full h-full'>
        <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Marked</p>
          </div>
          
        </div> */}
        {/*  */}
      </div>
    </div>
  )
}

export default ExamScript