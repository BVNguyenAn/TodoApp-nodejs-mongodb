import React, { useState, useEffect } from "react";  
import axios from 'axios';
import { Icon } from '@iconify/react';
import "./App.css";
import SingleTodo from "./components/singleTodo";
import EditTodo from "./components/editTodo";
function App() {
  const [todo, setTodo] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [listTodo, setListTodo] = useState([])
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
  });
//get the list of todo
  const getListTodo =() => {
    //define url

    //get Todo function
    axiosInstance.get('/getTodo')
      .then(response => {
        const ContainTodo = response.data
        setListTodo(ContainTodo)
      })
      .catch(error => {
        // if err happen => log
        console.error('Error:', error);
      });
  }
    getListTodo();
  // fuction submit 
  const handleSubmit = (e) => {
    e.preventDefault()
    // post data to database
    axiosInstance.post('/todo',{
      todo: todo,
      isEditting: false
    }).then((res) =>{
      console.log(res);
    })    
    setTodo('')

  }
  // function delete
  const handleDelete = (id) => {
    axiosInstance.post('/deleteTodo/' + id,{
      id: id
    })
    console.log(id);
  }
  // function setEditing
  const setEditing = (todo) => {
    setNewTodo(todo.todo)
    axiosInstance.post('/editing/' + todo._id,{
      isEditting: true
    })
  }
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
            listTodo.map((todo, index) => {
              if(todo.isEditting){
                return(
                  <EditTodo data={todo}/>
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