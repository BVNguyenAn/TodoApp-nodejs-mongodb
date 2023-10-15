export const GetTodoAction = (todo) => (dispatch, getState) =>{
        dispatch({
            type: 'ADD_TODO',
            payload: todo
        })
        console.log(getState());
};