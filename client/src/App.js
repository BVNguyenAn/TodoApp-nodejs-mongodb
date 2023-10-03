import React, { useState, useEffect } from "react";  
import axios from 'axios';
import { Icon } from '@iconify/react';
import "./App.css";
import SingleTodo from "./components/singleTodo";

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
  useEffect(() => {
    getListTodo();
  }, []);
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
    getListTodo();
    setTodo('')

  }
  // function delete
  const handleDelete = (id) => {
    getListTodo();
    axiosInstance.post('/deleteTodo/' + id,{
      id: id
    })
    console.log(id);
    getListTodo();
  }
  // function setEditing
  const setEditing = (todo) => {
    setNewTodo(todo.todo)
    getListTodo();
    axiosInstance.post('/editing/' + todo._id,{
      isEditting: true
    })
    getListTodo();
  }
  // function handleDelete
  const handleEdit = (e, todo) => {
    e.preventDefault()
    getListTodo()
    axiosInstance.patch('/edit/' + todo._id , {
        todo: newTodo,
        isEditting: false
    })
    getListTodo()
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
                  <div className="editInp">
                  <form onSubmit={(e) => handleEdit(e, todo)}>
                      <input required={true} placeholder='your new task' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
                      <button className="changeBtn" type='submit'>change</button>
                  </form>
                </div>
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