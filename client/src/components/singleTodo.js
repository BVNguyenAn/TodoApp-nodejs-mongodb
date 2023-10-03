import React from 'react'

const SingleTodo = (todo) => {
  return (
    <div className='singleTodo'>
        <p className='todoText'>{todo.data}</p>
        </div>
  )
}

export default SingleTodo