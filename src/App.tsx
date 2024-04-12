import './App.scss'
import { useEffect, useState } from 'react';
import InputTodoComponent from './todo/inputTodo'

function App() {
  const [count, setCount] = useState(0);
  const name = "Lee";
  const age = 25;
  const info = {
    address: "Ha noi",
    gender: "male"
  }

  const handleTest = (content: string) => {
    alert(content);
  }
  const [ListTodo, setListTodo] = useState<string[]>([]);
  const [Todo, setTodo] = useState("");

  //React lifeCycle
  //mounting:= born : phase 1
  //DidUpdate:= update : phase 2
  //WillUnmount:= delete : phase 3
  return (
    <>
      <div>
        <div>Count: {count}</div>
        <button onClick={() => { setCount(count + 1) }}>click</button>
      </div>
      <div className='parent'>
        <div className='child'></div>
      </div>
      <InputTodoComponent
        name={name}
        age={age}
        info={info}
        testFunction={handleTest}
        ListTodo={ListTodo}
        setListTodo={setListTodo}
        Todo={Todo}
        setTodo={setTodo}
      >
        <span>Input componenet</span>
      </InputTodoComponent>
      <ul>
        {
          ListTodo.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        }
      </ul>

      <div>

      </div>
    </>
  )
}

export default App
