import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { logoutUser, selectAuth } from "../store/reducers/authSlice";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useGetTodoQuery, useLazyLogOutUserQuery, useLazyGetTodoQuery } from "../services/AuthApi";
import { useEffect } from "react";
import axios from "axios";
const Dashboard = () => {
  const { user } = useAppSelector(selectAuth);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOutUser,{data, isError, isSuccess, error}] = useLazyLogOutUserQuery()
  const [getTodo, {data: dataTodo, isError: isErrorTodo, isSuccess: isSuccessTodo, error: errorTodo}] = useLazyGetTodoQuery()
  // const [data, isError, isSuccess, error] = useGetTodoQuery()

  useEffect(()=>{

    if(isSuccess){
      console.log(data)
      toast.success("User Logged Out");
      navigate("/auth")
    }else{
      console.log(error)
    }

  }, [isError, isSuccess])

  useEffect(() =>{
    if(isSuccessTodo){
      console.log(dataTodo)
    }else{
      console.log("fgjfdfafdf")
    }
  },[isSuccessTodo, isErrorTodo])
  const handleLogout = async () => {
    // const cookies = new Cookies()
    // cookies.remove("access_token")
    // cookies.remove("refresh_token")
    await logOutUser()
   
    dispatch(logoutUser());
    navigate("/auth");
  };
  const handlereq = async () => {
    await getTodo()

  };
  return (
    <>
      <div>Dashboard</div>
      <p>Name: {user.name}</p>
      <button className="btn btn-primary" onClick={() => handleLogout()}>
        Logout
      </button>
      <button className="btn btn-primary" onClick={() => handlereq()}>
        getReq
      </button>
    </>
  );
};

export default Dashboard;