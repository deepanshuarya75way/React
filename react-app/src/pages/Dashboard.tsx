import {useAppDispatch, useAppSelector} from '../hooks/hooks'
import {useNavigate} from 'react-router-dom'
import { logoutUser, selectAuth } from '../store/reducers/authSlice'
import {toast} from 'react-toastify'
import Cookies from 'universal-cookie'
const Dashboard = () => {
  const {name} = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const handleLogout = async() => {
      const cookies = new Cookies()
      cookies.remove("access_token")
      cookies.remove("refresh_token")
      toast.success("User Logged Out")
      dispatch(logoutUser())
      navigate('/auth')
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