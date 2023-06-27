import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../../theAuth/context'

const Stundents =()=> {
    const {stuScripts,setStuIdx} =useContext(AuthContext)

    const checkForAll = (item) => {
        for(let i = 0; i < item.length; i++){
            if(item[i].admm === ''){
                return false
            }
        }

        return true;
    }

  return (
    <div className='viewScreen'>
        <div className='flex-col w-full'>
            <h1 className='mt-4 ml-10'>Students</h1>

            {
                stuScripts.map((item,index)=>{
                    let check = checkForAll(stuScripts[index].qandn)

                   return (
                    <>
                    {
                        check ? null:
                        <NavLink key={index} className='no-underline' onClick={()=>{
                                setStuIdx(index)
                                console.log('Hello world')
                            }} to={'../examscripts'}>
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
                    }
                    </>
                )
                    // return(
                    //     <NavLink key={index} className='no-underline' onClick={()=>{
                    //                                                                 setStuIdx(index)
                    //                                                                 console.log('Hello world')
                    //                                                             }} to={'../examscripts'}>
                    //         <div className='detCardView'>
                    //             <div>
                    //                 <p className=' text-gray-950'>Name: {item.name}</p>
                    //             </div>

                    //             <div>
                    //                 <p className=' text-gray-950'>Mat_N0: {item.mat_no}</p>
                    //             </div>

                    //             <div>
                    //                 <p className=' text-gray-950'>Course: {item.course_title}</p>
                    //             </div>

                    //             <div>
                    //                 <p className=' text-gray-950'>Course_Code: {item.course_code}</p>
                    //             </div>
                    //         </div>
                    //     </NavLink>
                    // )
                })
            }
        
        </div>
    
    </div>
  )
}

export default Stundents