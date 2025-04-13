import React from 'react'
import RestaurantContext from './RestaurantContext'

const RestaurantContextProvider = ({children}) => {
    const [restaurantData, setRestaurantData] = React.useState()

    return (
        <RestaurantContext.Provider value={{restaurantData, setRestaurantData}}>
            {children}
        </RestaurantContext.Provider>
    )
}

export default RestaurantContextProvider