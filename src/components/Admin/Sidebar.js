import React from 'react'
import './Admin.css'
import { SidebarData } from '../data/SidebarData'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sideBarWrapper'>
        {
            SidebarData.map((item, index)=>{
                return(
                    <div className='Wrapper1' key={index}>
                        <NavLink to={item.path} className='Wrapper2 no-underline'>
                            <span className='pt-2 text-white'>{item.icon}</span>
                            <span className='text-white no-underline'>{item.title}</span>
                        </NavLink>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Sidebar