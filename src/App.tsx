// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import MyFirstComponent from './test/my.component'
// import LeeComponent from './test/second.component'
import InputTodoComponent from './todo/inputTodo'
function App() {
  // const [count, setCount] = useState(0)
  const name = "Lee";
  const age = 25;
  const info = {
    address: "Ha noi",
    gender: "male"
  }
  const toDos = ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"]

  return (
    <>

      <div className='parent'>
        <div className='child'></div>
      </div>
      <InputTodoComponent
        name={name}
        age={age}
        info={info}
        abc={"abs"}
      />
      <ul>
        {toDos.map((item, index) => {
          return (
            <li key={index}  >{item}</li>
          )
        })}
      </ul>

      <div>
        {/* <MyFirstComponent />
      <LeeComponent />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div >
      <h1>ReactJS + Vite</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      </div>
    </>
  )
}

export default App
