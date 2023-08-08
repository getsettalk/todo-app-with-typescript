import React, { useState } from 'react'
import "./App.css"
import { Footer } from './component/Footer'
import { useTodos } from './store/TodoList'
import TodoData from './component/TodoData'

const App = () => {
  const [input, setInput] = useState("")
  const [type, setType] = useState("all")

  const { handleAddTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input == "") {
      return;
    }
    handleAddTodo(input);
    setInput("")
  }

  const changeTab = (type: string) => {
    setType(type)
  }


  return (
    <div className='main'>
      <div className="card">
        <div className="card-header">
          <h1>Todo App (React + Typescript)</h1>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input type="text" className='input' placeholder='Write Your Todo' value={input} onChange={(e) => setInput(e.target.value)} />
              <button type="submit" className='add'>Add</button>
            </div>
          </form>

          <div className="tabBox">
            <div className={`tabBtn ${type == 'all' ? 'active' : ''}`} onClick={() => changeTab("all")}>All</div>
            <div className={`tabBtn ${type == 'active' ? 'active' : ''}`} onClick={() => changeTab("active")}>Active</div>
            <div className={`tabBtn ${type == 'done' ? 'active' : ''}`} onClick={() => changeTab("done")}>done</div>
          </div>
        </div>
        <TodoData type={type} />
      </div>

      <Footer />
    </div>
  )
}

export default App