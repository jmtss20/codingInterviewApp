import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from '../types/actions'
import rootReducer from '../reducers/main'
import { Resident } from '../types/index'

const julia: Resident = {
    name: 'Julia',
    phase: 'junior',
    key: 1
}
const mike: Resident = {
    name: 'Mike',
    phase: 'junior',
    key: 2
}
const shannon: Resident = {
    name: 'Shannon',
    phase: 'junior',
    key: 3
}
const sina: Resident = {
    name: 'Sina',
    phase: 'senior',
    key: 4
}
const trevor: Resident = {
    name: 'Trevor',
    phase: 'senior',
    key: 5
}
const initialState = {
    residents: [julia, mike, shannon, sina, trevor],
    helloWorld: "Hellow World"
}

export type AppState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)))