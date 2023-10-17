import React from 'react'

const SingleTodo = (todo) => {
  return (
    <div className='single-todo'>
        <p className='todo-text'>{todo.data}</p>
        </div>
  )
}

export default SingleTodo