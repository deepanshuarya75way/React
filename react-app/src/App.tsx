import Alert from "./components/Alert"
import ListGroup from "./components/ListGroup"
import Button from "./components/Button"

function App(){
  const items = ["New York", "Chicago", "Las vegas"]
  const handleSelectItem = (item: string) => {
    console.log(item)
  }
  return (
    <div>
      < ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
      <Alert>
        <h1>Hello World</h1>
      </Alert>
      <Button text="Click me"  />
    </div>
  )
}
export default App
