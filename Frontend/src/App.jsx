import React, { useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import RoomBooking from "./pages/RoomBooking";
import UserDetails from "./pages/UserDetails";
import RestaurantBooking from "./pages/RestaurantBooking.jsx";
import TableBooking from "./pages/TableBooking.jsx";
import UserContextProvider from "./context/User/UserContextProvider.jsx";
import PopupContextProvider from "./context/Popup/PopupContextProvider.jsx";
import RestaurantContextProvider from "./context/Restaurant/RestaurantContextProvider.jsx";
import HallBooking from "./pages/HallBooking.jsx";
import HallReservationsummary from "./components/HallReservationsummary.jsx";
import HallContextProvider from "./context/Hall/HallContextProvider.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <UserContextProvider>
      <PopupContextProvider>
        <RestaurantContextProvider>
          <HallContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/RoomBooking" element={<RoomBooking />} />
              <Route
                path="/RestaurantBooking"
                element={<RestaurantBooking />}
              />
              <Route path="/UserDetails" element={<UserDetails />} />
              <Route path="/TableBooking" element={<TableBooking />} />
              <Route path="/HallBooking" element={<HallBooking />} />
              <Route
                path="/HallReservationsummary"
                element={<HallReservationsummary />}
              />
            </Routes>
          </HallContextProvider>
        </RestaurantContextProvider>
      </PopupContextProvider>
    </UserContextProvider>
  );
};

export default App;
