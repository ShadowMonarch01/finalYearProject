import React from 'react'

const Dashboard = () => {
  return (
    <div className='viewScreen'>
      <div className='bg-red-200 w-full'>
        <div className='flex flex-wrap bg-slate-500'>
          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Courses</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Marked</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Pending</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow'>
            <p className='text-xl'>Scores</p>
          </div>

          <div className=' rounded h-40 bg-gray-300 p-2 w-64 m-4 flex-grow max-w-lg'>
            <p className='text-xl'>Questions</p>
          </div>
        </div>
        {/*  */}
      </div>
      {/* <div className=' w-full mx-10 my-10 grid grid-cols-3 gap-3'>
        <div className=' rounded h-40 bg-gray-300 p-2 col-span-1'>
          <p className='text-xl'>Excel File Format</p>
        </div>
        <div className=' rounded h-40 bg-gray-300 p-2 col-start-2 col-span-1'>
          <p className='text-xl'>First row of each column should be used to indicate what that column Contains</p>
        </div>
        <div className=' rounded h-40 bg-gray-300 p-2 col-start-3 col-span-1'>
          <p className='text-xl'>Each Question or Answer should take only one cell</p>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard;