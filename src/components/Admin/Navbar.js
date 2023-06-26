import React,{useContext} from 'react'
import './Admin.css'
import {BsBook} from 'react-icons/bs'
import { AuthContext } from '../../theAuth/context'

const Navbar = () => {

  const {admDet} = useContext(AuthContext);
  return (
    <div className='navBarContainer'>

        <div className='navBarContainer1'>
            <div>
                <BsBook className='barIcon'/>
            </div>
            <div>
                <p className='barText'>Welcome {admDet?.name}</p> 
            </div>
        </div>
    </div>
  )
}

export default Navbar