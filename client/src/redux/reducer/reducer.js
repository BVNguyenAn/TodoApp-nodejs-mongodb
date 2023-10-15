const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_TODO':
            return action.payload
        case 'ADD_TODO':
            return action.payload
        case 'DELETE_TODO':
            return action.payload
        case 'EDIT_TODO':
            return action.payload
        default:
            return state
    }
}

export default reducer