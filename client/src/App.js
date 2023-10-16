import React, { useEffect, useState } from "react";  
import axios from 'axios';
import { Icon } from '@iconify/react';
import "./App.css";
import SingleTodo from "./components/singleTodo";
import EditTodo from "./components/editTodo";
import { useDispatch, useSelector } from "react-redux";
import { AddTodoAction, DeleteTodoAction, GetTodoAction, SetEditingTodoAction } from "./redux/action/action";
function App() {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch()
  const axiosInstance = axios.create({
    baseURL: 'https://backend-b2al.onrender.com:433',
  });
//get the list of todo
  const getListTodo =() => {

    //get Todo function
    axiosInstance.get('/getTodo')
      .then(response => {
        dispatch(GetTodoAction(response.data))

      })
      .catch(error => {
        // if err happen => log
        console.error('Error:', error);
      });
  }
    useEffect(() => {
      getListTodo();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  // fuction submit 
  const handleSubmit = (e) => {
    e.preventDefault()
    // post data to database
    axiosInstance.post('/todo',{
      todo: todo,
      isEditting: false
    }).then((res) =>{
      console.log(res.data._id);
      dispatch(AddTodoAction(res.data.todo, res.data._id))
    })    
    setTodo('')
  }
  // function delete
  const handleDelete = (id) => {
    axiosInstance.delete('/deleteTodo/' + id)
    dispatch(DeleteTodoAction(id))
  }
  // function setEditing
  const setEditing = (todo) => {
    axiosInstance.post('/editing/' + todo._id,{
      isEditting: true
    })
    dispatch(SetEditingTodoAction(todo._id))  
  }

  const todos = useSelector(state => state)
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