import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import RoomBooking from './pages/RoomBooking'
import { UserContext } from './context/User/UserContext'
import UserContextProvider from './context/User/UserContextProvider'
import UserDetails from './pages/UserDetails'


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RoomBooking' element={<RoomBooking />} />
        <Route path='/UserDetails' element={<UserDetails />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App