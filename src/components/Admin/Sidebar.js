import React,{useContext} from 'react'
import './Admin.css'
import { SidebarData } from '../data/SidebarData'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../theAuth/context'
const Sidebar = () => {

    const {admDet} = useContext(AuthContext)
  return (
    <div className='sideBarWrapper'>
        {/* <div className='flex flex-col items-center mt-4 mb-4'>
            <div className='bg-white w-20 h-20 rounded-full'></div>
            <p className='text-white text-2xl'>User Name</p>
        </div> */}
        {
            SidebarData.map((item, index)=>(
                
                    item.title !=='Upload' ?
                    <div className='Wrapper1' key={index}>
                        <NavLink to={item.path} className='Wrapper2 no-underline'>
                            <span className='pt-2 text-white'>{item.icon}</span>
                            <span className='text-white no-underline'>{item.title}</span>
                        </NavLink>
                    </div>
                    :
                    item.title ==='Upload' && admDet.adm === 'alpha' ?
                    <div className='Wrapper1' key={index}>
                        <NavLink to={item.path} className='Wrapper2 no-underline'>
                            <span className='pt-2 text-white'>{item.icon}</span>
                            <span className='text-white no-underline'>{item.title}</span>
                        </NavLink>
                    </div>
                    :null
                
            ))
        }
    </div>
  )
}

export default Sidebar