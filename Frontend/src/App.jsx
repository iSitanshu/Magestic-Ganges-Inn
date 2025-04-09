import React, { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import RoomBooking from './pages/RoomBooking'
import UserContextProvider from './context/User/UserContextProvider.jsx'
import UserDetails from './pages/UserDetails'
import PopupContextProvider from './context/Popup/PopupContextProvider.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <UserContextProvider>
      <PopupContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RoomBooking' element={<RoomBooking />} />
        <Route path='/UserDetails' element={<UserDetails />} />
      </Routes>
      </PopupContextProvider>
    </UserContextProvider>
  )
}

export default App