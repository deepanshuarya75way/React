import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={< Dashboard />} />
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
