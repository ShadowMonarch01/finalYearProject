import React from 'react'
import './Admin.css'
import {BsBook} from 'react-icons/bs'

const Navbar = () => {
  return (
    <div className='navBarContainer'>

        <div className='navBarContainer1'>
            <div>
                <BsBook className='barIcon'/>
            </div>
            <div>
                <p className='barText'>Welcome Admin</p> 
            </div>
        </div>
    </div>
  )
}

export default Navbar