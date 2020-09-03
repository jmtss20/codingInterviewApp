import { combineReducers } from 'redux'
import helloWorldReducer from './helloWorldReducer'

const rootReducer = combineReducers({
    helloWorld: helloWorldReducer
})

export default rootReducer