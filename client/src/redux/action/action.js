

export const GetTodoAction = (todo) => (dispatch, getState) =>{
        dispatch({
            type: 'GET_TODO',
            payload: todo
        })
};
export const AddTodoAction = (todo, id) => (dispatch, getState) => {
    const todos = getState()
    dispatch({
        type: 'ADD_TODO',
        payload: [{_id: id,todo,isEditting: false }, ...todos]
    })
    console.log(getState());
}
export const DeleteTodoAction = (id) => (dispatch, getState) => {
    const todos = getState()
    dispatch({
        type: 'DELETE_TODO',
        payload: todos.filter(t => t._id !== id)
    })
}
export const SetEditingTodoAction = (id) => (dispatch, getState) => {
    const todos = getState()
    const todoClicked = todos.findIndex((obj => obj._id === id))
    todos[todoClicked].isEditting = true
    dispatch({
        type: 'SETEDIT_TODO',
        payload: [...todos]
    })
    console.log('set ok');
}
export const EditTodoAction = (todo, id) => (dispatch, getState) => {
    const todos = getState()
    const editingTodo = todos.findIndex((obj => obj._id === id))
    todos[editingTodo].todo = todo
    todos[editingTodo].isEditting = false
    dispatch({
        type: 'EDIT_TODO',
        payload: [...todos]
    })
    console.log('working');
}