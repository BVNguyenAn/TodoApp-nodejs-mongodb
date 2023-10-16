import React, { useEffect, useState } from "react";  
import axios from 'axios';
import { Icon } from '@iconify/react';
import "./App.css";
import SingleTodo from "./components/singleTodo";
import EditTodo from "./components/editTodo";
import { useDispatch } from "react-redux";
import { GetTodoAction } from "./redux/action/action";
import { store } from "./redux/store";
function App() {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:433',
  });
//get the list of todo
  const getListTodo =() => {

    //get Todo function
    axiosInstance.get('/getTodo')
      .then(response => {
        dispatch(GetTodoAction(response.data))
        console.log('dispatch');
      })
      .catch(error => {
        // if err happen => log
        console.error('Error:', error);
      });
  }
    useEffect(() => {
      getListTodo();
      console.log('useEffect');
    }, [])
  // fuction submit 
  const handleSubmit = (e) => {
    e.preventDefault()
    getListTodo();
    // post data to database
    axiosInstance.post('/todo',{
      todo: todo,
      isEditting: false
    }).then((res) =>{
      console.log(res);
    })    
    setTodo('')
    getListTodo();
  }
  // function delete
  const handleDelete = (id) => {
    getListTodo();
    axiosInstance.delete('/deleteTodo/' + id)
    console.log(id);
    getListTodo();
  }
  // function setEditing
  const setEditing = (todo) => {
    getListTodo();
    axiosInstance.post('/editing/' + todo._id,{
      isEditting: true
    })
    getListTodo();
  }
  const todos = store.getState()
  return (
<div className="container">
      <div className="app">
        <h1 className="title">GET THING DONE!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input className="inpTodo" placeholder="What is the task today?" required={true} value={todo} onChange={(e) => setTodo(e.target.value)}/>
          <button className="submitBtn" type="submit">Add Task</button>
        </form>
        <div className="ListTodo">
          {
            todos.map((todo, index) => {
              if(todo.isEditting){
                return(
                  <EditTodo key={index} data={todo}/>
                )
              }else{
                return(
                  <div className="containTodo" key={index}>
                  <SingleTodo data={todo.todo}/>
                  <button className="editBtn" onClick={() => setEditing(todo)}><Icon icon="uil:edit" /></button>
                  <button className="deleteBtn" onClick={() => handleDelete(todo._id)}><Icon icon="mdi:bin" /></button>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
</div>
  );
}

export default App