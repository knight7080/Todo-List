import React, { useState } from 'react'

import './App.css'

const TodoList = (props) =>{
    
    return(
      <div className="list-container">
        {props.list.map((ele) => {
          return <div className="list-element">
            <div className='upper-half'>
              {ele.edit ? <input type='text' className='search-bar' onKeyDown={(event)=>props.enter(event,ele)} onChange={(event) => props.change(event.target.value)}/> : <p className='task' style={{color : ele.isCompleted? "green" : "red"}}>{ele.task}</p>}
              <button className='ibtn' onClick={() => props.edit(ele)}>Edit</button>
              <button className='ibtn' onClick={() => props.remove(ele.id)}>Remove</button>
              <button className='ibtn' onClick={() => props.complete(ele)}>Complete</button>
            </div>
            <hr className='line'/>
          </div>
        })}
      </div>
    )
}

function App() {
  const [list,setList] = useState([]);
  const [task,setTask] = useState("");
  const editHandler = (element) => {
    setList(list.map((ele) => ele === element ? {...ele, edit: true} : ele))
  }
  const removeHandler = (id) => {
      setList(list.filter((ele) => ele.id === id ? false : true))
  }
  const completeHandler = (element) => {
    setList(list.map((ele) => ele === element ? {...ele, isCompleted: true} : ele))
  }

  const changeHandler = (val) =>{
      setTask(val);
  }

  const enterHandler = (event, elem) =>{
    if(event.key === 'Enter'){
      setList(list.map((ele) => ele.id === elem.id ? {...ele, edit: false, task: task} : ele))
    }
  }
  const addTask = (task) =>{
      setList([...list, {
        id: list.length === 0 ? 1 : list[list.length-1].id+1,
        task: task,
        isCompleted : false,
        edit: false 
      }]
    )
  }
  return(
    <React.Fragment>
      <div className='main-container'>
        <h2>Todo List</h2>
        <div className='search'>
            <input type="text" placeholder="Add task" onChange={(events)=>setTask(events.target.value)} className='search-bar' />
            <button className='btn' onClick={() => addTask(task)}>Add Task</button>
        </div>
        <div className="list">
            <TodoList list={list} edit = {editHandler} remove = {removeHandler} complete = {completeHandler} change = {changeHandler} enter = {enterHandler}/>
            {console.log(list)}
        </div>
      </div>
    </React.Fragment>
  )
}
export default App
