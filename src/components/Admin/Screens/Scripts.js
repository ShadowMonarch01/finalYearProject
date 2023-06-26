import React from 'react'
import '../Admin.css'
import { Routes, Route } from 'react-router-dom'
import Courses from './forScripts/Courses'
import Stundents from './forScripts/Stundents'
import ExamScript from './forScripts/ExamScript'

const Scripts =()=> {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Courses/>}/>
        <Route path='/students' element={<Stundents/>}/>
        <Route path='/examscripts' element={<ExamScript/>}/>
      </Routes>
    </div>
  )
}

export default Scripts