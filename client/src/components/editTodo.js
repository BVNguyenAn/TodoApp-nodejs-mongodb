import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoAction } from '../redux/action/action';
const EditTodo = (todo) => {
    const axiosInstance = axios.create({
        baseURL: 'https://backend-b2al.onrender.com',
      });
    const [newTodo, setNewTodo] = useState(todo.data.todo)
    const dispatch = useDispatch()
    const handleEdit = (e) => {
        e.preventDefault()
        axiosInstance.put('/edit/' + todo.data._id , {
            todo: newTodo,
            isEditting: false
        })
        dispatch(editTodoAction(newTodo, todo.data._id))
    }
  return (
    <div className="edit-inp"key={todo.data._id}>
    <form onSubmit={(e) => handleEdit(e)} >
        <input required={true} placeholder='your new task' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button className="change-btn" type='submit'>change</button>
    </form>
  </div>
  )
}

export default EditTodo
