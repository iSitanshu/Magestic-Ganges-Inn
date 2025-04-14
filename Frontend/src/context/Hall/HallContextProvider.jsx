import React from 'react'
import HallContext from './HallContext'

const HallContextProvider = ({children}) => {
    const [HallData, setHallData] = React.useState()

    return (
        <HallContext.Provider value={{HallData, setHallData}}>
            {children}
        </HallContext.Provider>
    )
}

export default HallContextProvider