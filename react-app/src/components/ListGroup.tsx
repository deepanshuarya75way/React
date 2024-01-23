import { useState } from "react";
function ListGroup() {
  const items: string[] = [
    "New York",
    "Las Vegas",
    "Chicago",
    "San Andreas",
    "Los Angles",
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1)
  return (
    <>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={item} onClick={()=> setSelectedIndex(index)} className={selectedIndex === index? "list-group-item active" : "list-group-item"}>
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListGroup;
