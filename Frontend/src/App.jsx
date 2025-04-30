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
import HallAdmin from "./pages/HallAdmin.jsx";
import RoomAdmin from "./pages/RoomAdmin.jsx";
import RestaurantAdmin from "./pages/RestaurantAdmin.jsx";
import Contact from "./pages/Contact.jsx";

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
              <Route path="/HallAdmin" element={<HallAdmin />} />
              <Route path="/RoomAdmin" element={<RoomAdmin />} />
              <Route path="/RestaurantAdmin" element={<RestaurantAdmin />} />
              <Route
                path="/HallReservationsummary"
                element={<HallReservationsummary />}
              />
              <Route path="/Contact" element={<Contact />} />
            </Routes>
          </HallContextProvider>
        </RestaurantContextProvider>
      </PopupContextProvider>
    </UserContextProvider>
  );
};

export default App;