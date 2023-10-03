import React, { useState, useEffect } from "react";  
import axios from 'axios';
import "./App.css";

function App() {
  const [todo, setTodo] = useState('')
  const [listTodo, setListTodo] = useState([])
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
  });
//get the list of todo
  useEffect(() => {
    //define url
    const apiUrl = 'http://localhost:8000/getTodo';

    //get Todo function
    axios.get(apiUrl)
      .then(response => {
        const ContainTodo = response.data
        setListTodo(ContainTodo)
      })
      .catch(error => {
        // if err happen => log
        console.error('Error:', error);
      });
  }, [listTodo]);
  // fuction submit 
  const handleSubmit = (e) => {
    e.preventDefault()
    // post data to database
    axiosInstance.post('/todo',{
      todo: todo
    }).then((res) =>{
      console.log(res);
    })
    setTodo('')
  }
  // function delete
  const handleDelete = (id) => {
    axiosInstance.post('/deleteTodo',{
      id: id
    })
    console.log(id);
  }
  return (
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Your Todo" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit">Add</button>
      </form>
      <div className="ListTodo">
        {
          listTodo.map((todo, index) => (
            <div className="containTodo">
            <p key={index} className="singleTodo">{index + 1}. {todo.todo}</p>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App