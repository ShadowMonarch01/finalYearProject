import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../../theAuth/context'

const Courses =()=> {
    const {admDet, setStuScripts} = useContext(AuthContext)

    const getStudentsScripts = async(course_code) =>{
        fetch('http://127.0.0.1:5000/getscripts',{
          method: 'POST',
              headers: {
                //Header Defination
                'Accept':'application/json',
                'Content-Type':'application/json',
              },
              body: JSON.stringify({
                "course_code": course_code,
              })
        })
        .then((response) => response.json())
              .then((response) => {
                
                if (response.status === 'Collection Successful!') {
                  // setResponse(response.status)
                  setStuScripts(response.stu_scripts)
                  
                } else {  
                  alert(response.status)
                  console.log(response.status)              
                }
              })
              .catch((error) => {
                alert(error)
                console.error(error);
                
              });
      }
  return (
    <div className='viewScreen'>
        <div className='flex-col'>
            <h1 className='mt-4 ml-10'>Courses</h1>
            {
                admDet.courses.map((item,index)=>{
                    return(
                        <NavLink key={index} className='no-underline' onClick={()=>getStudentsScripts(item.c_code)} to={'./students'}>
                            <div className='detCardView'>
                                <div>
                                    <p className=' text-gray-950'>Course: {item.c_title}</p>
                                </div>

                                <div>
                                    <p className=' text-gray-950'>Course_Code: {item.c_code}</p>
                                </div>

                                <div>
                                    <p className=' text-gray-950'>Lecturer: {admDet?.name}</p>
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

export default Courses