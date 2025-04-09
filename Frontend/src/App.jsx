import React, { useState } from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import RoomBooking from './pages/RoomBooking'
import UserContextProvider from './context/User/UserContextProvider.jsx'
import UserDetails from './pages/UserDetails'
import PopupContextProvider from './context/Popup/PopupContextProvider.jsx'
import RestaurantBooking from './pages/RestaurantBooking.jsx'
import TableBooking from './pages/TableBooking.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <UserContextProvider>
      <PopupContextProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RoomBooking' element={<RoomBooking />} />
        <Route path='/RestaurantBooking' element={<RestaurantBooking />} />
        <Route path='/UserDetails' element={<UserDetails />} />
        <Route path='/TableBooking' element={<TableBooking />} />
        
      </Routes>
      </PopupContextProvider>
    </UserContextProvider>
  )
}

export default App