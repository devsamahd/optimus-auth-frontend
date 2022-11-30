import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectCurrentToken, selectCurrentUser } from './authSlice'


import React from 'react'

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const location = useLocation()
  return (
    token
    ? <Outlet user={user} />
    : <Navigate to="/login" state={{from: location}} replace />
    )
}

export default RequireAuth