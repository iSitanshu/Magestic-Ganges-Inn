import React from 'react'
import PopupContext from './PopupContext'

const PopupContextProvider = ({children}) => {
    const [showLogin, setShowLogin] = React.useState(false)
    return(
        
        <PopupContext.Provider value={{showLogin, setShowLogin}}>
        {children}
        </PopupContext.Provider>
    )
}

export default PopupContextProvider