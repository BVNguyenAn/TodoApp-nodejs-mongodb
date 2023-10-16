export const GetTodoAction = (todo) => (dispatch, getState) =>{
        dispatch({
            type: 'GET_TODO',
            payload: todo
        })
        console.log(getState());
};
export const AddTodoAction = (todo) => (dispatch, getState) => {
    
}