import React, { useEffect } from 'react'
import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {useNavigate} from 'react-router-dom'
import { logoutUser, selectAuth } from '../store/reducers/authSlice'
import {toast} from 'react-toastify'
const Dashboard = () => {
  const {name} = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  

  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate('/auth')
    toast.success("User Logged Out")

  }
  return (
    <>
    <div>Dashboard</div>
    <p>Name: {name}</p>
    <button className='btn btn-primary' onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default Dashboard