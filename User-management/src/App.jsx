import React from 'react'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddUser from './Components/AddUser'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/new-user' element={<AddUser/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

