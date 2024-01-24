import Alert from "./components/Alert"
import ListGroup from "./components/ListGroup"
import Button from "./components/Button"
import Form from "./components/Form"
import { useState } from "react"

function App(){
  const [AlertVisibility, setAlertVisibility] = useState(false)
  const items = ["New York", "Chicago", "Las vegas"]
  const handleSelectItem = (item: string) => {
    console.log(item)
  }
  return (
    <div>
      <Form />
      <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
      {AlertVisibility && <Alert onClose={() => {setAlertVisibility(false)}}><h1>Hello World</h1></Alert>}
      
      <Button color="primary" onClick={() => {setAlertVisibility(true)}}>Click Me</Button>
    </div>
  )
}
export default App
