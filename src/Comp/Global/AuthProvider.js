import React, { createContext, useState,useEffect } from 'react'
import { app } from '../../base'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [currentUser, SetCurrentUser]= useState(null)

    useEffect(() => {
       app.auth()
       .onAuthStateChanged((user)=>{
           SetCurrentUser(user)
       })
       console.log(currentUser)
    }, [])
    return (
        <AuthContext.Provider value = {{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
