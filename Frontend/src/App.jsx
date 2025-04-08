import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import RoomBooking from './pages/RoomBooking'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RoomBooking' element={<RoomBooking />} />
      </Routes>
    </>
  )
}

export default App