import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './Global/AuthProvider'

const PrivateRoute = ({children}) => {
    const {currentUser}= useContext(AuthContext)
    return (
        <div>
            {
            currentUser ? children : <Navigate to="/register"/>
            }
        </div>
    )
}

export default PrivateRoute
