import React from 'react'
import axios from 'axios';
import { useState } from 'react';

const EditTodo = (todo) => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:433',
      });
    const [newTodo, setNewTodo] = useState(todo.data.todo)
    const handleEdit = (e) => {
        e.preventDefault()
        axiosInstance.put('/edit/' + todo.data._id , {
            todo: newTodo,
            isEditting: false
        })  
    }
  return (
    <div className="editInp"key={todo.data._id}>
    <form onSubmit={(e) => handleEdit(e)} >
        <input required={true} placeholder='your new task' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button className="changeBtn" type='submit'>change</button>
    </form>
  </div>
  )
}

export default EditTodo