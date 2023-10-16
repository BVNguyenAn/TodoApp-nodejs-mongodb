import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from "../redux/reducer/reducer";

const initialState = []
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
export const store = createStore(reducer,initialState, composedEnhancer)