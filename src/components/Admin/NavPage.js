import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Screens/Dashboard'
import Scripts from './Screens/Scripts'
import Settings from './Screens/Settings'
import Upload from './Screens/Upload'

const NavPage = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/scripts' element={<Scripts/>}/>
            <Route path='/settings' element={<Settings/>}/>
            <Route path='/upload' element={<Upload/>}/>
        </Routes>
    </div>
  )
}

export default NavPage