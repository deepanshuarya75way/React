import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setUser } from './store/reducers/authSlice';
import { useAppDispatch } from './hooks/hooks';


function App() {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  useEffect(() =>{
    dispatch(setUser(user))
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path='/auth' element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/register" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={< Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// function App(){
//   const [AlertVisibility, setAlertVisibility] = useState(false)
//   const items = ["New York", "Chicago", "Las vegas"]
//   const handleSelectItem = (item: string) => {
//     console.log(item)
//   }
//   return (
//     <div>
//       <Form />
//       <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
//       {AlertVisibility && <Alert onClose={() => {setAlertVisibility(false)}}><h1>Hello World</h1></Alert>}

//       <Button color="primary" onClick={() => {setAlertVisibility(true)}}>Click Me</Button>
//     </div>
//   )
// }
