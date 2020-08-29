import { combineReducers } from 'redux'
import helloWorldReducer from './helloWorldReducer'
import residentsReducer from './residentsReducer'

const rootReducer = combineReducers({
    helloWorld: helloWorldReducer,
    residents: residentsReducer
})

export default rootReducer