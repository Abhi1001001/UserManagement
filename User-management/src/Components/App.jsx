import Home from './Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDetail from './UserDetail'
import { useState } from 'react'

export default function App() {
  const[userId, setUserId]= useState("")

  const sendData = (userId)=>{
    setUserId(userId);   
  }
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home sendData={sendData} />}/>
      <Route path={`/id=${userId}`} element={<UserDetail userId={userId} />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

