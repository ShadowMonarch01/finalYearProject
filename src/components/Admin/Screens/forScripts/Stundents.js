import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../../theAuth/context'

const Stundents =()=> {
    const {stuScripts} =useContext(AuthContext)
  return (
    <div className='viewScreen'>
        <div className='flex-col'>
            <h1 className='mt-4 ml-10'>Students</h1>

            {
                stuScripts.map((item,index)=>{
                    return(
                        <NavLink key={index} className='no-underline' onClick={()=>console.log('Hello world')} to={'../examscripts'}>
                            <div className='detCardView'>
                                <div>
                                    <p className=' text-gray-950'>Name: {item.name}</p>
                                </div>

                                <div>
                                    <p className=' text-gray-950'>Mat_N0: {item.mat_no}</p>
                                </div>

                                <div>
                                    <p className=' text-gray-950'>Course: {item.course_title}</p>
                                </div>

                                <div>
                                    <p className=' text-gray-950'>Course_Code: {item.course_code}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
            }
        
        </div>
    
    </div>
  )
}

export default Stundents